import { MonsterSelection, Player, Spell } from "./types/GameTypes";

//esempio charisma : 12 --> (12-10)/2 = 1 --> +1
export function GetModifier(value : number) : string {
    const valNum = parseInt(value + "") ?? 0;
    if(valNum === 0) return "";
    const mod = Math.floor((valNum - 10.0) / 2.0);
    let result = mod + "";
    if(mod > 0){
        result = "+" + result;
    }
    return " (" + result + ")";
}

export function GetInitiative(p : Player, m : MonsterSelection){
    const initModifier : number = parseInt(p?.initModifier + "") ?? 0;

      let manualRoll : number = parseInt(m?.manualRoll + "") ?? 0;
      if(manualRoll === 0){
        const d20_Roll : number = Math.ceil(Math.random() * 20);
        manualRoll = d20_Roll;
      }
      /** iniziativa = manualRoll + modifier */
      return manualRoll + initModifier;
}
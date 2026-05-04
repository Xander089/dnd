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
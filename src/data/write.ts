import { Game } from "../types/Game";
import { MonsterSelection, Player, Spell } from "../types/GameTypes";

export class Dao {
  static updateStatusDuration(step: number) {
    const playingWithStatuses = [
      ...this.getPlayers("player"),
      ...this.getPlayers("monster"),
    ]?.filter((p) => p.isPlaying && (p.statuses ?? []).some((s) => s.duration > 0));

    playingWithStatuses?.forEach((p) => {
      p.statuses = (p.statuses ?? [])
        .map((s) => ({ ...s, duration: s.duration - step }))
        .filter((s) => s.duration > 0);
    });
    playingWithStatuses?.forEach((p) => this.writePlayer(p));
  }

  static addMonstersToGame(categories: MonsterSelection[]) {
    categories
      // ?.filter((cat) => cat.isSelected && cat.quantity > 0)
      ?.filter((cat) => cat.quantity > 0)
      ?.forEach((cat) => this.addMonsterToGame(cat));
  }

  static addMonsterToGame(category: MonsterSelection) {
    const selectedCategory = this.getPlayers("monster")?.filter(
      (m) => m?.name === "" && m.category === category.category
    )[0];
    const count = this.getPlayingCategoryCount(category);
    let i = 0;
    while (i < category.quantity) {

      const initModifier : number = parseInt(selectedCategory?.initModifier + "") ?? 0;

      let manualRoll : number = parseInt(category?.manualRoll + "") ?? 0;
      if(manualRoll === 0){
        const d20_Roll : number = Math.ceil(Math.random() * 20);
        manualRoll = d20_Roll;
      }
      /** iniziativa = manualRoll + modifier */
      const initiative : number = manualRoll + initModifier;
      const stamp: Omit<Player, "id"> = {
        name: selectedCategory.category + (i + 1 + count),
        category: selectedCategory.category,
        type: "monster",
        hp: selectedCategory.hp,
        currentHp: selectedCategory.currentHp,
        initiative: initiative,
        strength: selectedCategory.strength,
        dexterity: selectedCategory.dexterity,
        constitution: selectedCategory.constitution,
        intelligence: selectedCategory.intelligence,
        wisdom: selectedCategory.wisdom,
        charisma: selectedCategory.charisma,
        isPlaying: true,
        statuses: [],
        monsterProperties: selectedCategory.monsterProperties,
        initModifier: selectedCategory.initModifier
      };
      this.addPlayer(stamp);
      i += 1;
    }
  }

  static getPlayingCategoryCount(category: MonsterSelection): number {
    return (
      this.getPlayers("monster")?.filter(
        (m) => m?.name !== "" && m.category === category.category && m.isPlaying
      )?.length ?? 0
    );
  }

  static removePlayer(id: number, type: string) {
    if (type === "monster") {
      this.deletePlayer(id);
    } else {
      const player = this.findPlayer(id);
      const newPlayer: Partial<Player> = {
        id: player?.id,
        name: player?.name,
        category: player?.category,
        type: player?.type,
        hp: player?.hp,
        currentHp: player?.currentHp,
        initiative: player?.initiative,
        strength: player?.strength,
        dexterity: player?.dexterity,
        constitution: player?.constitution,
        intelligence: player?.intelligence,
        wisdom: player?.wisdom,
        charisma: player?.charisma,
        isPlaying: false,
        statuses: player?.statuses ?? [],
        initModifier: player?.initModifier
      };
      this.writePlayer(newPlayer);
    }
  }

  static getAllLocalStorage(): string {
    return (
      this.getAllKeys()
        ?.map((it) => it + "######" + (localStorage.getItem(it) ?? ""))
        .join("|||") ?? ""
    );
  }
  static writeAllLocalStorage(text: string) {
    if (text.length == 0) {
      localStorage.clear();
      return;
    }
    localStorage.clear();
    text.split("|||")?.forEach((kv) => {
      console.log("keyValue", kv);
      const keyValue = kv?.split("######");
      localStorage.setItem(keyValue[0], keyValue[1]);
    });
  }

  static addPlayer(
    player: Omit<Player, "id"> | Partial<Omit<Player, "id">>
  ): Player {
    const newId = this.getMaxKey() + 1;
    const result = { id: newId, ...player } as Player;
    this.writePlayer(result);
    return result;
  }

  static getMaxKey(): number {
    const players = this.getPlayers("player");
    const monsters = this.getPlayers("monster");
    const all = [...players, ...monsters];
    if (all.length > 0) {
      const ids = all?.map((player) => player.id);
      return Math.max(...ids) ?? 0;
    }
    return 0;
  }

  static writePlayer(player: Player | Partial<Player>) {
    const key = player?.id + "_" + player?.type;
    if (key !== undefined) {
      localStorage.setItem(key, JSON.stringify(player));
    }
  }

  static getAllKeys(): string[] {
    const result = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) ?? "";
      result.push(key);
    }
    return result;
  }

  static getKeys(query: string): string[] {
    const result = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) ?? "";
      if (key?.includes("_" + query)) {
        result.push(key);
      }
    }
    return result;
  }

  static findPlayer(id: number): Player | undefined {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) ?? "";
      if (key !== "") {
        try {
          const player: any = JSON.parse(localStorage.getItem(key) ?? "{}");
          if (player?.id === id) {
            return player as Player;
          }
        } catch (e: any) {}
      }
    }
  }

  static getPlayers(type: string): Player[] {
    return this.getKeys(type)?.map(
      (key) => JSON.parse(localStorage?.getItem(key) ?? "{}") as Player
    );
  }
  static deletePlayer(id: number) {
    const player = this.findPlayer(id);
    if (player !== undefined) {
      const key = player?.id + "_" + player?.type;
      localStorage.removeItem(key);
    }
  }

  static deleteAll(type: string) {
    this.getPlayers(type)?.forEach((p) => this.deletePlayer(p?.id));
  }

  static getPlayingMembersCount(): number {
    const party = this.getPlayers("player")?.filter(
      (m) => m.isPlaying === true
    );
    const monsters = this.getPlayers("monster")?.filter(
      (m) => m.isPlaying === true && m.name !== ""
    );
    return [...party, ...monsters].length ?? 0;
  }

  static getEmptyGame(): Game {
    return {
      turn: 0,
      step: 0,
      count: this.getPlayingMembersCount(),
      effectName: "",
      effectDuration: 0,
    };
  }

  static getGame(): Game {
    const game = localStorage.getItem("TheGame") ?? "";
    if (game !== "") {
      return JSON.parse(game) as Game;
    } else {
      return this.getEmptyGame();
    }
  }

  static writeGame(g: Game) {
    localStorage.setItem("TheGame", JSON.stringify(g));
  }

  static refreshGameTurnStepsCount() {
    const current = this.getGame();
    const newGame: Game = {
      turn: current.turn,
      step: current.step,
      count: this.getPlayingMembersCount(),
      effectName: current.effectName,
      effectDuration: current.effectDuration,
    };
    this.writeGame(newGame);
  }

  static updateGameEffect(name: string, duration: number) {
    const current = this.getGame();
    const newGame: Game = {
      turn: current.turn,
      step: current.step,
      count: current.count,
      effectName: name,
      effectDuration: duration * current.count,
    };
    this.writeGame(newGame);
  }

  static resetGame() {
    localStorage.setItem("TheGame", JSON.stringify(this.getEmptyGame()));
  }

  static resetAllStatuses() {
    const all = [...this.getPlayers("player"), ...this.getPlayers("monster")].filter(
      (p) => p.isPlaying
    );
    all.forEach((p) => this.writePlayer({ ...p, statuses: [] }));
  }

  static deleteAllMonstersInGame() {
    this.getPlayers("monster")
      .filter((m) => m.name !== "")
      .forEach((m) => this.deletePlayer(m.id));
  }

  static #spellsKey = "Grimoire";

  static getSpells(): (Spell & { id: number })[] {
    return JSON.parse(localStorage.getItem(this.#spellsKey) ?? "[]");
  }

  static addSpell(spell: Spell): Spell & { id: number } {
    const spells = this.getSpells();
    const id = spells.length > 0 ? Math.max(...spells.map((s) => s.id)) + 1 : 1;
    const newSpell = { ...spell, id };
    localStorage.setItem(this.#spellsKey, JSON.stringify([...spells, newSpell]));
    return newSpell;
  }

  static updateSpell(id: number, spell: Spell): void {
    const spells = this.getSpells().map((s) =>
      s.id === id ? { ...spell, id } : s
    );
    localStorage.setItem(this.#spellsKey, JSON.stringify(spells));
  }

  static deleteSpell(id: number): void {
    const spells = this.getSpells().filter((s) => s.id !== id);
    localStorage.setItem(this.#spellsKey, JSON.stringify(spells));
  }
}

export class DefeatedMonsters {
  static #key = "DefeatedMonsters";

  static getAll(): string[] {
    return JSON.parse(localStorage.getItem(this.#key) ?? "[]");
  }

  static addEntry(entry: string): void {
    const current = this.getAll();
    localStorage.setItem(this.#key, JSON.stringify([...current, entry]));
  }

  static clear(): void {
    localStorage.removeItem(this.#key);
  }
}

export class History {
  static #history = "History";
  static #lastDateKey = "HistoryLastDate";

  static getAll(end: number = 100): string[] {
    const history = JSON.parse(
      localStorage?.getItem(this.#history) ?? "[]"
    ) as string[];
    return history.slice(0, end);
  }

  static deleteAll() {
    localStorage?.removeItem(this.#history);
    localStorage?.removeItem(this.#lastDateKey);
  }

  static #time(): string {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");
    return `[${h}:${m}]`;
  }

  static #date(): string {
    const now = new Date();
    const d = now.getDate().toString().padStart(2, "0");
    const mo = (now.getMonth() + 1).toString().padStart(2, "0");
    return `${d}/${mo}/${now.getFullYear()}`;
  }

  static #insert(line: string) {
    localStorage?.setItem(
      this.#history,
      JSON.stringify([line, ...this.getAll(99)])
    );
  }

  static #checkMidnight() {
    const today = new Date().toDateString();
    const last = localStorage.getItem(this.#lastDateKey);
    if (last && last !== today) {
      this.#insert(`🕛 Mezzanotte — ${this.#date()}`);
    }
    localStorage.setItem(this.#lastDateKey, today);
  }

  static addLine(line: string) {
    this.#checkMidnight();
    this.#insert(`${this.#time()} ${line}`);
  }

  static addSessionStart() {
    this.#checkMidnight();
    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");
    this.#insert(`▶ Sessione — ${this.#date()} ${h}:${m}`);
  }
}

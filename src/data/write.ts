import { Game } from "../types/Game";
import { MonsterSelection, Player } from "../types/GameTypes";

export class Dao {
  static updateStatusDuration(step: number) {
    const playingAndStatusActive = [
      ...this.getPlayers("player"),
      ...this.getPlayers("monster"),
    ]?.filter((p) => p.isPlaying && p.statusDuration > 0);
    //se premo avanti step = 1 e decremento la duration
    //se premo indietro step = -1 e incremento la duration
    playingAndStatusActive?.forEach((p) => {
      p.statusDuration -= step;
      if (p.statusDuration === 0) {
        p.status = "";
      }
    });
    playingAndStatusActive?.forEach((p) => this.writePlayer(p));
  }

  static addMonstersToGame(categories: MonsterSelection[]) {
    categories
      ?.filter((cat) => cat.isSelected && cat.quantity > 0)
      ?.forEach((cat) => this.addMonsterToGame(cat));
  }

  static addMonsterToGame(category: MonsterSelection) {
    const selectedCategory = this.getPlayers("monster")?.filter(
      (m) => m?.name === "" && m.category === category.category
    )[0];
    const count = this.getPlayingCategoryCount(category);
    let i = 0;
    while (i < category.quantity) {
      const stamp: Omit<Player, "id"> = {
        name: selectedCategory.category + (i + 1 + count),
        category: selectedCategory.category,
        type: "monster",
        hp: selectedCategory.hp,
        currentHp: selectedCategory.currentHp,
        initiative: Math.ceil(Math.random() * 20), //roll initiative
        strength: selectedCategory.strength,
        dexterity: selectedCategory.dexterity,
        constitution: selectedCategory.constitution,
        intelligence: selectedCategory.initiative,
        wisdom: selectedCategory.wisdom,
        charisma: selectedCategory.charisma,
        isPlaying: true,
        status: "",
        statusDuration: 0,
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
        status: player?.status,
        statusDuration: player?.statusDuration,
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
}

export class History {
  static #history = "History";
  static getAll(end: number = 100): string[] {
    //faccio sì che la storia non restituisca + di 100 elementi
    const history = JSON.parse(
      localStorage?.getItem(this.#history) ?? "[]"
    ) as string[];
    return history.slice(0, end);
  }

  static deleteAll() {
    localStorage?.removeItem(this.#history);
  }
  static addLine(line: string) {
    localStorage?.setItem(
      this.#history,
      JSON.stringify([line, ...this.getAll(99)]) //faccio sì che la storia non contenga + di 100 elementi
    );
  }
}

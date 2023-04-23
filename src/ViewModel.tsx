import { Dao, History } from "./data/write";
import { MonsterSelection, Player } from "./types/GameTypes";

export class ViewModel {
  static reset() {
    localStorage.clear();
    Dao.deleteAll("player");
    Dao.deleteAll("monster");
    // Dao.writeAll();
    Dao.resetGame();
    History.deleteAll();
  }

  static sortPlayers(players: Player[]): Player[] {
    const result = players.sort((a, b) => {
      const aIndex = a?.initiative ?? 0;
      const bIndex = b?.initiative ?? 0;
      if (aIndex * 1 > bIndex * 1) return -1;
      if (aIndex * 1 < bIndex * 1) return 1;
      return 0;
    });
    return [...result];
  }

  static getPlayersInitialState(): Player[] {
    const party = Dao.getPlayers("player")?.filter((m) => m.isPlaying === true);
    const monsters = Dao.getPlayers("monster")?.filter(
      (m) => m.isPlaying === true && m.name !== ""
    );
    return this.sortPlayers([...party, ...monsters]); //al refresh della pagina sono mostrati già ordinati per initiative
  }

  static sort(players: MonsterSelection[]): MonsterSelection[] {
    const result = players.sort((a, b) => {
      const aIndex = a?.category?.toLowerCase() ?? "";
      const bIndex = b?.category?.toLowerCase() ?? "";
      if (aIndex > bIndex) return 1;
      if (aIndex < bIndex) return -1;
      return 0;
    });
    return [...result];
  }

  static sortMonsters(players: Player[]): Player[] {
    const result = players.sort((a, b) => {
      const aIndex = a?.category?.toLowerCase() ?? "";
      const bIndex = b?.category?.toLowerCase() ?? "";
      if (aIndex > bIndex) return 1;
      if (aIndex < bIndex) return -1;
      return 0;
    });

    return [...result];
  }

  static sortParty(players: Player[]): Player[] {
    const result = players.sort((a, b) => {
      const aIndex = a?.name?.toLowerCase() ?? "";
      const bIndex = b?.name?.toLowerCase() ?? "";
      if (aIndex > bIndex) return 1;
      if (aIndex < bIndex) return -1;
      return 0;
    });
    return [...result];
  }

  static getCategories(): MonsterSelection[] {
    return Dao.getPlayers("monster")
      ?.filter((m) => m?.name === "")
      ?.map((it) => {
        return {
          id: it.id,
          category: it.category,
          initiative: it.initiative,
          isSelected: false,
          quantity: 0,
        };
      }) as MonsterSelection[];
  }

  static selectCategory(
    cat: MonsterSelection[],
    id: number,
    isSelected: boolean
  ): MonsterSelection[] {
    const currentCategories = cat.filter((it) => it.id !== id);
    const oldCategory = cat.filter((it) => it.id === id)[0];
    const catToUpdate: MonsterSelection = {
      category: oldCategory.category,
      id: oldCategory.id,
      isSelected: isSelected,
      quantity: oldCategory.quantity,
    };
    return [...currentCategories, catToUpdate];
  }

  static updateQuantity(
    cat: MonsterSelection[],
    id: number,
    quantity: number
  ): MonsterSelection[] {
    const currentCategories = cat.filter((it) => it.id !== id);
    const oldCategory = cat.filter((it) => it.id === id)[0];
    const catToUpdate: MonsterSelection = {
      category: oldCategory.category,
      id: oldCategory.id,
      isSelected: oldCategory.isSelected,
      quantity: quantity,
    };
    return [...currentCategories, catToUpdate];
  }

  static manualRoll(players: Player[]): Player[] {
    players.forEach(
      (p) =>
        (p.initiative =
          p.type === "monster" ? Math.ceil(Math.random() * 20) : p.initiative)
    );
    return this.sortPlayers(players);
  }

  static updateStatusDuration(step: number) {
    Dao.updateStatusDuration(step);
  }
}

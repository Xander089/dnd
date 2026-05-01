export type PlayerStatus = {
  name: string;
  duration: number;
};

export type Player = {
  id: number;
  name: string;
  category: string;
  type: string;
  hp: number;
  currentHp: number;
  initiative: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  isPlaying: boolean;
  statuses: PlayerStatus[];
  sortIndex?: number;
};

// export type Monster = Omit<Player, "sortIndex">;

export type MonsterSelection = {
  id: number;
  category: string;
  isSelected: boolean;
  initiative: number;
  quantity: number;
};
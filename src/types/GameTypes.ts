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
  monsterProperties?: Partial<MonsterProperties>;
};

// export type Monster = Omit<Player, "sortIndex">;

export type MonsterSelection = {
  id: number;
  category: string;
  isSelected: boolean;
  initiative: number;
  manualRoll: number;
  quantity: number;
};

//(nome, scuola, livello, tempo di lancio, gittata, durata, effetto)
export type Spell = {
  name: string,
  school: string,
  level: number,
  castingTime: string,
  castingTimeEnumValue?: string,
  range: string,
  duration: string,
  durationEnumValue?: string,
  effect: string
}

export type MonsterProperties = {
  /** Always present in combat tracker component */
  type: string, // text box
  AC : number, // number box
  traits: string, // text area
  actions: string, // text area
  alignment: string, // text box
  /** Visible only if added during monster creation */
  savingThrows: string, // text box
  abilities : string, // text area
  resistances: string, // text area
  damage_immunities: string, // text area
  condition_immunities: string, // text area
  senses: string, // text area
  challenge_rating: number, // number box
  proficiency_bonus: number, // number box
  exp: number, // number box
  bonus_actions: string, // text area
  legendary_actions: string, // text area
  reactions: string, // text area
  vulnerability: string //text area
  spells: number[] // IDs from grimoire
}
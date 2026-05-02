import "../App.css";
import { useState } from "react";
import "./Monsters.css";
import Icon from "./Icon";
import ModalDelete from "./dialogs/ModalDelete";
import { MonsterProperties, Player, Spell } from "../types/GameTypes";
import { Dao } from "../data/write";
import MonsterHeader from "./MonsterHeader";
import { ViewModel } from "../ViewModel";

type MonsterCategory = Partial<
  Omit<
    Player,
    "id" | "name" | "sortIndex" | "statuses" | "isPlaying"
  >
>;
export default function Monsters(props: any) {
  const [players, setPlayers] = useState(
    ViewModel.sortMonsters(
      Dao.getPlayers("monster")?.filter((m) => m?.name === "")
    ) //prendo solo le categorie. Una Categoria è un player senza nome
  );
  const [showAddNew, setShowAddNew] = useState(false);

  const refreshPlayers = (player: Player) => {
    setPlayers(ViewModel.sortMonsters([...players, player]));
  };
  const handleDelete = (id: number) => {
    setPlayers(ViewModel.sortMonsters([...players.filter((p) => p.id !== id)]));
    props?.refreshMonstersCategories();
  };
  const filterPlayers = (searched: string) => {
    const filtered = Dao.getPlayers("monster")?.filter(
      (p) =>
        p.name === "" &&
        p.category?.toLowerCase()?.includes(searched.toLowerCase())
    );
    setPlayers(ViewModel.sortMonsters([...filtered]));
  };

  return (
    <>
      <MonsterHeader
        Title="Monsters"
        showAddNew={showAddNew}
        setShowAddNew={setShowAddNew}
        filterPlayers={filterPlayers}
      />

      <div className="tab ">
        <div className="tab-container">
          <div className="monster-tab-sub-container">
            <div className="member-surrounder">
              {showAddNew ? (
                <AddMember
                  setShowAddNew={setShowAddNew}
                  refreshPlayers={refreshPlayers}
                  refreshMonstersCategories={props?.refreshMonstersCategories}
                />
              ) : (
                <></>
              )}

              {players?.map((player) => (
                <Member
                  key={player?.id + "_" + player?.category}
                  player={player}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MonsterPropsAlways({
  monsterProps,
  handleMonsterProp,
  onBlur,
}: {
  monsterProps: Partial<MonsterProperties>;
  handleMonsterProp: (key: keyof MonsterProperties, value: any) => void;
  onBlur?: () => void;
}) {
  return (
    <div className="monster-props-always">
      <div className="input-container">
        <p className="stat-label">AC</p>
        <input
          type="number"
          value={monsterProps.AC ?? ""}
          onChange={(e) => handleMonsterProp("AC", Number(e.target.value))}
          onBlur={onBlur}
        />
      </div>
      <div className="input-container">
        <p className="stat-label">Creature Type</p>
        <input
          type="text"
          value={monsterProps.type ?? ""}
          onChange={(e) => handleMonsterProp("type", e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className="input-container">
        <p className="stat-label">Alignment</p>
        <input
          type="text"
          value={monsterProps.alignment ?? ""}
          onChange={(e) => handleMonsterProp("alignment", e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className="input-container-wide">
        <p className="stat-label">Special Traits</p>
        <textarea
          value={monsterProps.traits ?? ""}
          onChange={(e) => handleMonsterProp("traits", e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className="input-container-wide">
        <p className="stat-label">Actions</p>
        <textarea
          value={monsterProps.actions ?? ""}
          onChange={(e) => handleMonsterProp("actions", e.target.value)}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}

function MonsterPropsOptional({
  monsterProps,
  handleMonsterProp,
  onBlur,
  onSpellsChange,
}: {
  monsterProps: Partial<MonsterProperties>;
  handleMonsterProp: (key: keyof MonsterProperties, value: any) => void;
  onBlur?: () => void;
  onSpellsChange?: (ids: number[]) => void;
}) {
  return (
    <div className="monster-props-optional">
      <div className="input-container">
        <p className="stat-label">Challenge Rating</p>
        <input
          type="number"
          value={monsterProps.challenge_rating ?? ""}
          onChange={(e) =>
            handleMonsterProp("challenge_rating", Number(e.target.value))
          }
          onBlur={onBlur}
        />
      </div>
      <div className="input-container">
        <p className="stat-label">Prof. Bonus</p>
        <input
          type="number"
          value={monsterProps.proficiency_bonus ?? ""}
          onChange={(e) =>
            handleMonsterProp("proficiency_bonus", Number(e.target.value))
          }
          onBlur={onBlur}
        />
      </div>
      <div className="input-container">
        <p className="stat-label">EXP</p>
        <input
          type="number"
          value={monsterProps.exp ?? ""}
          onChange={(e) => handleMonsterProp("exp", Number(e.target.value))}
          onBlur={onBlur}
        />
      </div>
      <div className="input-container">
        <p className="stat-label">Saving Throws</p>
        <input
          type="text"
          value={monsterProps.savingThrows ?? ""}
          onChange={(e) => handleMonsterProp("savingThrows", e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className="input-container-wide">
        <p className="stat-label">Senses</p>
        <textarea
          value={monsterProps.senses ?? ""}
          onChange={(e) => handleMonsterProp("senses", e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className="input-container-wide">
        <p className="stat-label">Abilities</p>
        <textarea
          value={monsterProps.abilities ?? ""}
          onChange={(e) => handleMonsterProp("abilities", e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className="input-container-wide">
        <p className="stat-label">Bonus Actions</p>
        <textarea
          value={monsterProps.bonus_actions ?? ""}
          onChange={(e) => handleMonsterProp("bonus_actions", e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className="input-container-wide">
        <p className="stat-label">Reactions</p>
        <textarea
          value={monsterProps.reactions ?? ""}
          onChange={(e) => handleMonsterProp("reactions", e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className="input-container-wide">
        <p className="stat-label">Legendary Actions</p>
        <textarea
          value={monsterProps.legendary_actions ?? ""}
          onChange={(e) =>
            handleMonsterProp("legendary_actions", e.target.value)
          }
          onBlur={onBlur}
        />
      </div>
      <div className="input-container-wide">
        <p className="stat-label">Resistances</p>
        <textarea
          value={monsterProps.resistances ?? ""}
          onChange={(e) => handleMonsterProp("resistances", e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className="input-container-wide">
        <p className="stat-label">Vulnerabilities</p>
        <textarea
          value={monsterProps.vulnerability ?? ""}
          onChange={(e) => handleMonsterProp("vulnerability", e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <div className="input-container-wide">
        <p className="stat-label">Dmg. Immunities</p>
        <textarea
          value={monsterProps.damage_immunities ?? ""}
          onChange={(e) =>
            handleMonsterProp("damage_immunities", e.target.value)
          }
          onBlur={onBlur}
        />
      </div>
      <div className="input-container-wide">
        <p className="stat-label">Cond. Immunities</p>
        <textarea
          style={{maxWidth : "12rem"}}
          value={monsterProps.condition_immunities ?? ""}
          onChange={(e) =>
            handleMonsterProp("condition_immunities", e.target.value)
          }
          onBlur={onBlur}
        />
      </div>
      <SpellMultiSelect
        selectedIds={monsterProps.spells ?? []}
        onChange={onSpellsChange ?? ((ids) => handleMonsterProp("spells", ids))}
      />
    </div>
  );
}

function SpellMultiSelect({
  selectedIds,
  onChange,
}: {
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}) {
  const [query, setQuery] = useState("");
  const allSpells: (Spell & { id: number })[] = Dao.getSpells();

  const filtered = query
    ? allSpells.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) &&
          !selectedIds.includes(s.id)
      )
    : [];

  return (
    <div className="spell-multiselect">
      <p className="stat-label">Spells</p>
      {selectedIds.length > 0 && (
        <div className="spell-chips-edit">
          {selectedIds.map((id) => {
            const spell = allSpells.find((s) => s.id === id);
            return spell ? (
              <span key={id} className="spell-chip-edit">
                {spell.name}
                <button
                  onClick={() => onChange(selectedIds.filter((i) => i !== id))}
                >×</button>
              </span>
            ) : null;
          })}
        </div>
      )}
      <div className="spell-search-wrapper">
        <input
          type="text"
          style={{margin : "0"}}
          placeholder="Search spell…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {filtered.length > 0 && (
          <div className="spell-dropdown">
            {filtered.map((s) => (
              <div
                key={s.id}
                className="spell-dropdown-item"
                onMouseDown={() => {
                  onChange([...selectedIds, s.id]);
                  setQuery("");
                }}
              >
                {s.name}
                <span className="spell-dropdown-level">Lv.{s.level}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Member(props: any) {
  const player: Player = props?.player;
  const [category, setCategory] = useState(player?.category);
  const [hp, setHp] = useState(player?.currentHp);
  const [maxHp, setMaxHp] = useState(player?.hp);
  const [init, setInit] = useState(player?.initiative);
  const [strength, setStrength] = useState(player?.strength);
  const [dexterity, setDexterity] = useState(player?.dexterity);
  const [constitution, setConstitution] = useState(player?.constitution);
  const [intelligence, setIntelligence] = useState(player?.intelligence);
  const [charisma, setCharisma] = useState(player?.charisma);
  const [wisdom, setWisdom] = useState(player?.wisdom);
  const [expanded, setExpanded] = useState(false);
  const [monsterProps, setMonsterProps] = useState<Partial<MonsterProperties>>(
    player?.monsterProperties ?? {}
  );
  const [deleteVisible, setDeleteVisible] = useState(false);

  const handleStats = () => {
    Dao.writePlayer({
      id: player?.id,
      name: "",
      category: category,
      type: "monster",
      hp: maxHp,
      currentHp: hp,
      initiative: init,
      strength: strength,
      dexterity: dexterity,
      constitution: constitution,
      intelligence: intelligence,
      wisdom: wisdom,
      charisma: charisma,
      isPlaying: player?.isPlaying,
      statuses: player?.statuses ?? [],
      sortIndex: player?.sortIndex,
      monsterProperties: monsterProps,
    });
  };

  const handleMonsterProp = (key: keyof MonsterProperties, value: any) => {
    setMonsterProps((prev) => ({ ...prev, [key]: value }));
  };

  const handleSpellsChange = (ids: number[]) => {
    const updated = { ...monsterProps, spells: ids };
    setMonsterProps(updated);
    Dao.writePlayer({
      id: player?.id,
      name: "",
      category: category,
      type: "monster",
      hp: maxHp,
      currentHp: hp,
      initiative: init,
      strength: strength,
      dexterity: dexterity,
      constitution: constitution,
      intelligence: intelligence,
      wisdom: wisdom,
      charisma: charisma,
      isPlaying: player?.isPlaying,
      statuses: player?.statuses ?? [],
      sortIndex: player?.sortIndex,
      monsterProperties: updated,
    });
  };

  return (
    <div className="member-border monster-bg" id={player?.id + "_" + player?.category}>
      <div className="member">
        <div className="input-container input-name monster-name">
          <p className="stat-label">Type</p>
          <input
            type={"text"}
            value={category}
            onChange={(event: any) => setCategory(event?.target.value)}
            onBlur={handleStats}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">HP</p>
          <input
            type={"number"}
            value={hp}
            onChange={(event: any) => setHp(event?.target.value)}
            onBlur={handleStats}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Max HP</p>
          <input
            type={"number"}
            value={maxHp}
            onChange={(event: any) => setMaxHp(event?.target.value)}
            onBlur={handleStats}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Initiative</p>
          <input
            type={"number"}
            value={init}
            onChange={(event: any) => setInit(event?.target.value)}
            onBlur={handleStats}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Strength</p>
          <input
            type={"number"}
            value={strength}
            onChange={(event: any) => setStrength(event?.target.value)}
            onBlur={handleStats}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Dexterity</p>
          <input
            type={"number"}
            value={dexterity}
            onChange={(event: any) => setDexterity(event?.target.value)}
            onBlur={handleStats}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Constitution</p>
          <input
            type={"number"}
            value={constitution}
            onChange={(event: any) => setConstitution(event?.target.value)}
            onBlur={handleStats}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Intelligence</p>
          <input
            type={"number"}
            value={intelligence}
            onChange={(event: any) => setIntelligence(event?.target.value)}
            onBlur={handleStats}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Charisma</p>
          <input
            type={"number"}
            value={charisma}
            onChange={(event: any) => setCharisma(event?.target.value)}
            onBlur={handleStats}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Wisdom</p>
          <input
            type={"number"}
            value={wisdom}
            onChange={(event: any) => setWisdom(event?.target.value)}
            onBlur={handleStats}
          ></input>
        </div>
        <div className="button-trash-container" style={{marginLeft: "3rem"}}>
          <button
            style={{
              marginTop: "0.5rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              color: "#543213"
            }}
            onClick={() => setExpanded((e) => !e)}
            title={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? "▲" : "▼"}
          </button>
          <button
            style={{
              marginTop: "0.5rem",
              background: "transparent",
              border: "none",
            }}
            className="damage-button"
            onClick={() => setDeleteVisible(true)}
          >
            <Icon name="trash" />
          </button>
          {deleteVisible ? (
            <ModalDelete
              deletePlayer={() => {
                Dao.deletePlayer(player?.id);
                console.log(player?.id);
                props?.handleDelete(player?.id);
              }}
              setDeleteVisible={setDeleteVisible}
              deleteVisible={deleteVisible}
              name={player?.category}
              type="Monster"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {expanded && (
        <div className="monster-properties">
          <MonsterPropsAlways
            monsterProps={monsterProps}
            handleMonsterProp={handleMonsterProp}
            onBlur={handleStats}
          />
          <MonsterPropsOptional
            monsterProps={monsterProps}
            handleMonsterProp={handleMonsterProp}
            onBlur={handleStats}
            onSpellsChange={handleSpellsChange}
          />
        </div>
      )}
    </div>
  );
}

function AddMember(props: any) {
  const [category, setCategory] = useState({} as MonsterCategory);
  const [addExpanded, setAddExpanded] = useState(false);
  const [monsterProps, setMonsterProps] = useState<Partial<MonsterProperties>>(
    {}
  );

  const handleAddClick = async () => {
    const newCategory = Dao.addPlayer({
      ...category,
      isPlaying: false,
      name: "",
      statuses: [],
      type: "monster",
      sortIndex: -1,
      monsterProperties:
        Object.keys(monsterProps).length > 0 ? monsterProps : undefined,
    });
    props?.refreshPlayers(newCategory);
    props?.setShowAddNew(false);
    props?.refreshMonstersCategories();
  };

  function isButtonAddDisabled(): boolean {
    const result =
      category?.category === undefined ||
      category?.constitution === undefined ||
      category?.charisma === undefined ||
      category?.currentHp === undefined ||
      category?.dexterity === undefined ||
      category?.hp === undefined ||
      category?.initiative === undefined ||
      category?.intelligence === undefined ||
      category?.strength === undefined ||
      category?.wisdom === undefined;
    return result;
  }

  const handleCategory = (property: string, value: any) => {
    const categoryToUpdate: MonsterCategory = {
      category: property === "category" ? value : category?.category,
      constitution:
        property === "constitution" ? value : category?.constitution,
      charisma: property === "charisma" ? value : category?.charisma,
      currentHp: property === "currentHp" ? value : category?.currentHp,
      dexterity: property === "dexterity" ? value : category?.dexterity,
      hp: property === "hp" ? value : category?.hp,
      initiative: property === "initiative" ? value : category?.initiative,
      intelligence:
        property === "intelligence" ? value : category?.intelligence,
      strength: property === "strength" ? value : category?.strength,
      type: "monster",
      wisdom: property === "wisdom" ? value : category?.wisdom,
    };
    setCategory(categoryToUpdate);
  };

  const handleMonsterProp = (key: keyof MonsterProperties, value: any) => {
    setMonsterProps((prev) => ({ ...prev, [key]: value }));
  };

  const selectedClassName = "member";

  return (
    <div className="member-border monster-bg">
      <div className={selectedClassName}>
        <div className="input-container monster-name">
          <p className="stat-label">Type</p>
          <input
            type={"text"}
            value={category?.category}
            onChange={(event: any) =>
              handleCategory("category", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">HP</p>
          <input
            type={"number"}
            value={category?.currentHp}
            onChange={(event: any) =>
              handleCategory("currentHp", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Max HP</p>
          <input
            type={"number"}
            value={category?.hp}
            onChange={(event: any) => handleCategory("hp", event?.target.value)}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Init. Mod</p>
          <input
            type={"number"}
            value={category?.initiative}
            onChange={(event: any) =>
              handleCategory("initiative", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Strength</p>
          <input
            type={"number"}
            value={category?.strength}
            onChange={(event: any) =>
              handleCategory("strength", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Dexterity</p>
          <input
            type={"number"}
            value={category?.dexterity}
            onChange={(event: any) =>
              handleCategory("dexterity", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Constitution</p>
          <input
            type={"number"}
            value={category?.constitution}
            onChange={(event: any) =>
              handleCategory("constitution", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Intelligence</p>
          <input
            type={"number"}
            value={category?.intelligence}
            onChange={(event: any) =>
              handleCategory("intelligence", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Charisma</p>
          <input
            type={"number"}
            value={category?.charisma}
            onChange={(event: any) =>
              handleCategory("charisma", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Wisdom</p>
          <input
            type={"number"}
            value={category?.wisdom}
            onChange={(event: any) =>
              handleCategory("wisdom", event?.target.value)
            }
          ></input>
        </div>
        <div className="button-trash-container" style={{marginLeft: "3rem"}}>
          <button
            style={{
              marginTop: "0.5rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              color: "#543213"
            }}
            onClick={() => setAddExpanded((e) => !e)}
            title={addExpanded ? "Collapse" : "Expand"}
          >
            {addExpanded ? "▲" : "▼"}
          </button>
          <button
            className="add-button add-button-monsters"
            disabled={isButtonAddDisabled()}
            onClick={handleAddClick}
          >
            Save
          </button>
        </div>
      </div>
      {addExpanded && (
        <div className="monster-properties">
          <MonsterPropsAlways
            monsterProps={monsterProps}
            handleMonsterProp={handleMonsterProp}
          />
          <MonsterPropsOptional
            monsterProps={monsterProps}
            handleMonsterProp={handleMonsterProp}
          />
        </div>
      )}
    </div>
  );
}

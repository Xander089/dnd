import "../App.css";
import { useState } from "react";
import "./Monsters.css";
import trash from "../assets/trash3.png";
import CustomIcon from "./layout/CustomIcon";
import ModalDelete from "./dialogs/ModalDelete";
import { Player } from "../types/GameTypes";
import { Dao } from "../data/write";
import MonsterHeader from "./MonsterHeader";
import { ViewModel } from "../ViewModel";

type MonsterCategory = Partial<
  Omit<
    Player,
    "id" | "name" | "sortIndex" | "status" | "statusDuration" | "isPlaying"
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
    props?.refreshMonstersCategories(); // refresh lista tipi in game quando premo add monsters
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

              {players?.map((player, index) => (
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
      status: player?.status,
      statusDuration: player?.statusDuration,
      sortIndex: player?.sortIndex,
    });
  };

  return (
    <div className="member-border" id={player?.id + "_" + player?.category}>
      <div className="member">
        <div className="input-container input-name">
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
        <div className="button-trash-container">
          <button
            style={{
              marginTop: "0.5rem",
              background: "transparent",
              border: "none",
            }}
            className="damage-button"
            onClick={() => setDeleteVisible(true)}
          >
            <CustomIcon bg={trash} />
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
    </div>
  );
}

function AddMember(props: any) {
  const [category, setCategory] = useState({} as MonsterCategory);

  const handleAddClick = async () => {
    const newCategory = Dao.addPlayer({
      ...category,
      isPlaying: false,
      name: "",
      status: "",
      statusDuration: 0,
      type: "monster",
      sortIndex: -1,
    });
    props?.refreshPlayers(newCategory);
    props?.setShowAddNew(false); //non mostro l'add
    props?.refreshMonstersCategories(); // refresh lista tipi in game quando premo add monsters
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

  const selectedClassName = "member";

  return (
    <div className="member-border">
      <div className={selectedClassName}>
        <div className="input-container">
          <p className="stat-label">Type</p>

          <input
            className="input-name"
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
          <p className="stat-label">Initiative</p>

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
        <div className="button-trash-container">
          <button
            className="add-button add-button-monsters"
            disabled={isButtonAddDisabled()}
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

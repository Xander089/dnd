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

export default function Party(props: any) {
  const [players, setPlayers] = useState(
    ViewModel.sortParty(Dao.getPlayers("player"))
  );
  const [showAddNew, setShowAddNew] = useState(false);

  const refreshPlayers = (player: Player) => {
    setPlayers(ViewModel.sortParty([...players, player]));
  };

  const handleDelete = (id: number) => {
    setPlayers(ViewModel.sortParty([...players.filter((p) => p.id !== id)]));
  };

  const filterPlayers = (searched: string) => {
    const filtered = Dao.getPlayers("player")?.filter((p) =>
      p.name?.toLowerCase()?.includes(searched.toLowerCase())
    );
    setPlayers(ViewModel.sortParty([...filtered]));
  };

  return (
    <>
      <MonsterHeader
        Title="Party"
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
                  setGame={props?.setGame}
                  refreshPlayingCharacters={props?.refreshPlayingCharacters}
                />
              ) : (
                <></>
              )}

              {players?.map((player) => (
                <Member
                  key={player?.id + "_" + player?.name}
                  player={player}
                  handleDelete={handleDelete}
                  setGame={props?.setGame}
                  refreshPlayingCharacters={props?.refreshPlayingCharacters}
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
  const [name, setName] = useState(player?.name);
  const [hp, setHp] = useState(player?.currentHp);
  const [maxHp, setMaxHp] = useState(player?.hp);
  const [init, setInit] = useState(player?.initiative);
  const [strength, setStrength] = useState(player?.strength);
  const [dexterity, setDexterity] = useState(player?.dexterity);
  const [constitution, setConstitution] = useState(player?.constitution);
  const [intelligence, setIntelligence] = useState(player?.intelligence);
  const [charisma, setCharisma] = useState(player?.charisma);
  const [wisdom, setWisdom] = useState(player?.wisdom);
  const [playing, setPlaying] = useState(player?.isPlaying);
  const [status, setStatus] = useState(player?.status);
  const [statusDuration, setStatusDuration] = useState(player?.statusDuration);

  const [deleteVisible, setDeleteVisible] = useState(false);

  const handleStats = (togglePlaying: boolean | undefined = undefined) => {
    Dao.writePlayer({
      id: player?.id,
      name: player?.name,
      category: "",
      type: "player",
      hp: maxHp,
      currentHp: hp,
      initiative: init,
      strength: strength,
      dexterity: dexterity,
      constitution: constitution,
      intelligence: intelligence,
      wisdom: wisdom,
      charisma: charisma,
      isPlaying: togglePlaying !== undefined ? togglePlaying : playing,
      status: status,
      statusDuration: statusDuration,
    });
  };

  const handleIsPlaying = () => {
    handleStats(!playing); //salvo
    // Dao.refreshGameTurnStepsCount(); //aggiorno il counter dei turni
    Dao.resetGame(); //aggiorno il counter dei turni
    setPlaying(!playing); //aggiorno lo stato
    props?.setGame(Dao.getGame()); //aggiorno l'hud
    props?.refreshPlayingCharacters(); //aggiorno lista plying char in game
  };

  const handleKeyDown = (event: any, playing: boolean) => {
    if (event.key === "Enter") {
      handleIsPlaying();
    }
  };

  return (
    <div
      // key={player?.id + "_" + player?.category}
      className="member-border"
      id={player?.id + "_" + player?.category}
    >
      <div className="member">
        <div className="input-container party-name">
          <p className="stat-label">Name</p>
          <input
            type={"text"}
            value={name}
            onChange={(event: any) => setName(event?.target.value)}
            onBlur={() => handleStats}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">HP</p>

          <input
            type={"number"}
            value={hp}
            onChange={(event: any) => {
              if (event?.target.value >= 0) setHp(event?.target.value);
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <div className="input-container">
          <p style={{ width: "3rem" }} className="stat-label">
            Max HP
          </p>

          <input
            type={"number"}
            value={maxHp}
            onChange={(event: any) => {
              if (event?.target.value >= 0) setMaxHp(event?.target.value);
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Initiative</p>

          <input
            type={"number"}
            value={init}
            onChange={(event: any) => {
              if (event?.target.value >= 0) setInit(event?.target.value);
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Strength</p>
          <input
            type={"number"}
            value={strength}
            onChange={(event: any) => {
              if (event?.target.value >= 0) setStrength(event?.target.value);
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Dexterity</p>

          <input
            type={"number"}
            value={dexterity}
            onChange={(event: any) => {
              if (event?.target.value >= 0) setDexterity(event?.target.value);
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Constitution</p>
          <input
            type={"number"}
            value={constitution}
            onChange={(event: any) => {
              if (event?.target.value >= 0)
                setConstitution(event?.target.value);
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Intelligence</p>
          <input
            type={"number"}
            value={intelligence}
            onChange={(event: any) => {
              if (event?.target.value >= 0)
                setIntelligence(event?.target.value);
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Charisma</p>
          <input
            type={"number"}
            value={charisma}
            onChange={(event: any) => {
              if (event?.target.value >= 0) setCharisma(event?.target.value);
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Wisdom</p>
          <input
            type={"number"}
            value={wisdom}
            onChange={(event: any) => {
              if (event?.target.value >= 0) setWisdom(event?.target.value);
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <div className="input-container input-container-check">
          <p
            style={{ marginBottom: "0.6rem", marginLeft: "1.5rem" }}
            className="stat-label stat-label-check"
          >
            In Game
          </p>
          <input
            onKeyDown={(event: any) => handleKeyDown(event, playing)}
            type={"checkbox"}
            checked={playing}
            onChange={handleIsPlaying}
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
                props?.handleDelete(player?.id);
              }}
              setDeleteVisible={setDeleteVisible}
              deleteVisible={deleteVisible}
              name={player?.name}
              type="Player"
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
  const [player, setPlayer] = useState({} as Player);

  const handleAddClick = async () => {
    const newPlayer = Dao.addPlayer({
      category: "",
      charisma: player?.charisma,
      constitution: player?.constitution,
      currentHp: player?.currentHp,
      dexterity: player?.dexterity,
      hp: player?.hp,
      initiative: player?.initiative,
      intelligence: player?.intelligence,
      isPlaying: player?.isPlaying,
      name: player?.name,
      strength: player?.strength,
      status: player?.status,
      statusDuration: player?.statusDuration,
      type: "player",
      wisdom: player?.wisdom,
    });

    // Dao.refreshGameTurnStepsCount(); //aggiorno il counter dei turni

    if (newPlayer?.isPlaying) {
      Dao.resetGame();
    }
    props?.refreshPlayers(newPlayer); //aggiorno lista players
    props?.setShowAddNew(false); //nascondo l'add
    props?.setGame(Dao.getGame()); //aggiorno l'hud
    props?.refreshPlayingCharacters(); //aggiorno lista player giocanti
  };

  function isButtonAddDisabled(): boolean {
    const result =
      player?.name === undefined ||
      player?.constitution === undefined ||
      player?.charisma === undefined ||
      player?.currentHp === undefined ||
      player?.dexterity === undefined ||
      player?.hp === undefined ||
      player?.initiative === undefined ||
      player?.intelligence === undefined ||
      // player?.isPlaying === undefined ||
      player?.strength === undefined ||
      player?.wisdom === undefined; //||
    // player?.status === undefined ||
    // player?.statusDuration === undefined;
    return result;
  }

  const handlePlayer = (property: string, value: any) => {
    const playerToUpdate: Player = {
      category: "",
      constitution: property === "constitution" ? value : player?.constitution,
      charisma: property === "charisma" ? value : player?.charisma,
      currentHp: property === "currentHp" ? value : player?.currentHp,
      dexterity: property === "dexterity" ? value : player?.dexterity,
      hp: property === "hp" ? value : player?.hp,
      initiative: property === "initiative" ? value : player?.initiative,
      intelligence: property === "intelligence" ? value : player?.intelligence,
      strength: property === "strength" ? value : player?.strength,
      type: "player",
      wisdom: property === "wisdom" ? value : player?.wisdom,
      id: player?.id,
      isPlaying: property === "isPlaying" ? value : player?.isPlaying,
      name: property === "name" ? value : player?.name,
      status: property === "status" ? value : player?.status,
      statusDuration:
        property === "statusDuration" ? value : player?.statusDuration,
    };
    setPlayer(playerToUpdate);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handlePlayer("isPlaying", !player?.isPlaying);
    }
  };

  return (
    <div className="member-border">
      <div className="member" style={{ alignItems: "center" }}>
        <div className="input-container party-name">
          <p className="stat-label">Name</p>

          <input
            type={"text"}
            value={player?.name}
            onChange={(event: any) => handlePlayer("name", event?.target.value)}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">HP</p>

          <input
            type={"number"}
            value={player?.currentHp}
            onChange={(event: any) =>
              handlePlayer("currentHp", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p
            style={{
              width: "3rem",
            }}
            className="stat-label"
          >
            Max HP
          </p>

          <input
            type={"number"}
            value={player?.hp}
            onChange={(event: any) => handlePlayer("hp", event?.target.value)}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Initiative</p>

          <input
            type={"number"}
            value={player?.initiative}
            onChange={(event: any) =>
              handlePlayer("initiative", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Strength</p>
          <input
            type={"number"}
            value={player?.strength}
            onChange={(event: any) =>
              handlePlayer("strength", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Dexterity</p>

          <input
            type={"number"}
            value={player?.dexterity}
            onChange={(event: any) =>
              handlePlayer("dexterity", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Constitution</p>
          <input
            type={"number"}
            value={player?.constitution}
            onChange={(event: any) =>
              handlePlayer("constitution", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Intelligence</p>
          <input
            type={"number"}
            value={player?.intelligence}
            onChange={(event: any) =>
              handlePlayer("intelligence", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Charisma</p>
          <input
            type={"number"}
            value={player?.charisma}
            onChange={(event: any) =>
              handlePlayer("charisma", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Wisdom</p>
          <input
            type={"number"}
            value={player?.wisdom}
            onChange={(event: any) =>
              handlePlayer("wisdom", event?.target.value)
            }
          ></input>
        </div>
        <div className="input-container input-container-check">
          <p
            style={{ marginBottom: "0.6rem", marginLeft: "1.5rem" }}
            className="stat-label stat-label-check"
          >
            In Game
          </p>
          <input
            onKeyDown={(event) => handleKeyDown(event)}
            type={"checkbox"}
            checked={player?.isPlaying}
            onChange={() => handlePlayer("isPlaying", !player?.isPlaying)}
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

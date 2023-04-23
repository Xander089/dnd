import { useState } from "react";
import "./Table.css";
import sword from "../assets/sword.png";
import cross from "../assets/green-cross-icon.png";
import trash from "../assets/trash3.png";
import warrior from "../assets/warrior.png";
import orc from "../assets/orc.png";
import arrowDown from "../assets/arrow-down.png";
import arrowUp from "../assets/arrow-up.png";
import CustomIcon from "./layout/CustomIcon";
import { Player } from "../types/GameTypes";
import DamageCure from "./dialogs/ModalDamageCure";
import { Dao } from "../data/write";
import Note from "./Note";
import History from "./History";
import Header from "./Header";
import ModalGlobalEffect from "./dialogs/ModalGlobalEffect";
import Hud from "./Hud";
import ModalRemoveFromGame from "./dialogs/ModalRemoveFromGame";

function Table(props: any) {
  const [expand, setExpand] = useState(true); //collassa vista laterale
  const [effectVisible, setEffectVisible] = useState(false); //modale global fx

  const selectedPlayer = props?.game?.step as number;
  const players: Player[] = props?.players;

  return (
    <>
      <ModalGlobalEffect
        effectVisible={effectVisible}
        setEffectVisible={setEffectVisible}
        applyGlobalEffect={props?.applyGlobalEffect}
        addHistoryRecord={props?.addHistoryRecord}
      />
      <Header
        chooseMonstersVisible={props?.chooseMonstersVisible}
        setChooseMonstersVisible={props?.setChooseMonstersVisible}
        effectVisible={effectVisible}
        setEffectVisible={setEffectVisible}
        expand={expand}
        setExpand={setExpand}
        roll={props?.applyManualRoll}
        game={props?.game}
        applyGlobalEffect={props?.applyGlobalEffect}
        addHistoryRecord={props?.addHistoryRecord}
      />
      <div className={"tab "}>
        <div className="tab-container">
          <div
            className={
              expand ? "tab-sub-container-expanded " : "tab-sub-container"
            }
          >
            <div className="member-surrounder">
              {players?.map((player, index) => (
                <Member
                  key={player?.id + "_player"}
                  isSelected={selectedPlayer === index}
                  applyCureDamageToPlayers={props?.applyCureDamageToPlayers}
                  player={player}
                  refreshPlayers={props?.refreshPlayers}
                  removePlayer={props?.removePlayer}
                  addHistoryRecord={props?.addHistoryRecord}
                />
              ))}
            </div>
            <div className={expand ? "tab-right-hidden" : ""}>
              <Note collapse={false} />
              <History
                collapse={false}
                game={props?.game}
                history={props?.history}
              />
            </div>
          </div>
        </div>
      </div>
      <Hud
        game={props?.game}
        setGame={props?.setGame}
        addHistoryRecord={props?.addHistoryRecord}
        handleStatusDuration={props?.handleStatusDuration}
      />
    </>
  );
}

function Member(props: any) {
  const player: Player = props?.player;
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [damageVisible, setDamageVisible] = useState(false);
  const [cureVisible, setCureVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false); //modale remove player

  function getCurrentPlayer(updatedHp: number | undefined = undefined): Player {
    return {
      id: player?.id,
      name: player?.name,
      category: player?.category,
      type: player?.type,
      hp: player?.hp,
      currentHp: updatedHp ?? player?.currentHp,
      initiative: player?.initiative,
      strength: player?.strength,
      dexterity: player?.dexterity,
      constitution: player?.constitution,
      intelligence: player?.intelligence,
      wisdom: player?.wisdom,
      charisma: player?.charisma,
      isPlaying: player?.isPlaying,
      status: player?.status,
      statusDuration: player?.statusDuration,
      sortIndex: player?.sortIndex,
    };
  }
  const handleStats = (updatedHp: number | undefined = undefined) => {
    Dao.writePlayer(getCurrentPlayer(updatedHp));
  };

  const openCureDialog = () => {
    setCureVisible(!cureVisible);
  };
  const openDamageDialog = () => {
    setDamageVisible(!damageVisible);
  };
  const handleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  function applyCureDamage(amount: number, sign: number) {
    const newHp =
      parseInt(player?.currentHp + "") + parseInt(amount * sign + "");
    props?.refreshPlayers("currentHp", newHp, player?.id); //cambia lo stato
    handleStats(newHp); //scrive in local storage
    props?.applyCureDamageToPlayers(getCurrentPlayer(newHp)); //refresh dei players

    const heal = sign > 0 ? "applica una cura" : "applica una ferita";
    props?.addHistoryRecord(
      "Il master" + heal + " a " + player?.name + " di " + amount + " punti"
    );
  }

  function removePlayer() {
    props?.removePlayer(player?.id, player?.type);
    props?.addHistoryRecord("il master rimuove " + player?.name + " dal game");
  }

  const handleAutomaticRemove = (hpValue: number) => {
    if (hpValue == 0) {
      setRemoveVisible(true);
    }
  };

  const colorHp = (life: number) => {
    if (life == 0) {
      return "faint";
    } else if (life > 0 && life < 3) {
      return "almost-faint";
    }
    return "";
  };

  const selectedClassName = !props?.isSelected ? "" : " memberSelected";
  const colorClassName =
    player?.type === "monster" ? " monster-bg" : " player-bg";

  return (
    <div className={"member-border" + selectedClassName + colorClassName}>
      {/* <CustomIcon
        size="24px"
        iconClass="game-icon"
        bg={player?.type === "player" ? warrior : orc}
      /> */}
      <div className="member">
        <div className="input-container larger-container input-name">
          <p className="stat-label">
            {player?.type === "monster" ? "Monster" : "Player"}
          </p>
          <input
            type={"text"}
            placeholder="Name"
            readOnly
            value={player?.name}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">HP</p>
          <input
            className={colorHp(player?.currentHp)}
            type={"number"}
            placeholder="HP"
            value={player?.currentHp}
            onChange={(event: any) => {
              props?.refreshPlayers(
                "currentHp",
                event?.target.value,
                player?.id
              );
              props?.addHistoryRecord(
                "Il master modifica gli HP di " +
                  player?.name +
                  " a " +
                  event?.target.value
              );
              const hp = event?.target.value as number;
              handleAutomaticRemove(hp);
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Max HP</p>
          <input
            type={"number"}
            placeholder="Max HP"
            value={player?.hp}
            readOnly
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Initiative</p>
          <input
            type={"number"}
            placeholder="Init"
            value={player?.initiative}
            onChange={(event: any) => {
              props?.refreshPlayers(
                "initiative",
                event?.target.value,
                player?.id
              );
              props?.addHistoryRecord(
                "Il master modifica l'iniziativa di " +
                  player?.name +
                  " a " +
                  event?.target.value
              );
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Status</p>
          <input
            type={"text"}
            className={(player?.status ?? "") !== "" ? "poison" : ""}
            placeholder="Status"
            value={player?.status}
            onChange={(event: any) => {
              props?.refreshPlayers("status", event?.target.value, player?.id);
              props?.addHistoryRecord(
                "Il master modifica lo status di " +
                  player?.name +
                  " a " +
                  event?.target.value
              );
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <div className="input-container">
          <p className="stat-label">Duration</p>
          <input
            type={"number"}
            placeholder="Duration"
            value={player?.statusDuration}
            onChange={(event: any) => {
              props?.refreshPlayers(
                "statusDuration",
                event?.target.value,
                player?.id
              );
              props?.addHistoryRecord(
                "Il master modifica la durata dello status di " +
                  player?.name +
                  " a " +
                  event?.target.value +
                  " step"
              );
            }}
            onBlur={() => handleStats()}
          ></input>
        </div>
        <button
          style={{
            background: "transparent",
            border: "none",
          }}
          className="member-button damage-button"
          onClick={openDamageDialog}
        >
          <CustomIcon bg={sword} />
        </button>
        <button
          style={{
            background: "transparent",
            border: "none",
          }}
          className="member-button"
          onClick={openCureDialog}
        >
          <CustomIcon bg={cross} />
        </button>
        <button
          style={{
            background: "transparent",
            border: "none",
          }}
          className="member-button"
          onClick={() => setRemoveVisible(true)}
        >
          <CustomIcon bg={trash} />
        </button>
        <div className="accordion">
          <button
            style={{
              marginTop: "0.5rem",
              background: "transparent",
              border: "none",
            }}
            onClick={handleAccordion}
          >
            <CustomIcon
              size="18px"
              bg={accordionOpen ? arrowUp : arrowDown}
            ></CustomIcon>
          </button>
        </div>
      </div>
      <OtherStats
        customCLass={accordionOpen ? "accordionOpen" : "accordionClosed"}
        isOpen={accordionOpen}
        player={player}
      />
      <DamageCure
        visible={damageVisible}
        setVisible={setDamageVisible}
        action={(amount: number) => applyCureDamage(amount, -1)}
        Label={"Damage " + player?.name}
      />
      <DamageCure
        visible={cureVisible}
        setVisible={setCureVisible}
        action={(amount: number) => applyCureDamage(amount, 1)}
        Label={"Cure " + player?.name}
      />
      <ModalRemoveFromGame
        removeVisible={removeVisible}
        setRemoveVisible={setRemoveVisible}
        type={player?.type}
        name={player?.name}
        removePlayer={removePlayer}
      />
    </div>
  );
}

function OtherStats(props: any) {
  const isOpen = props?.isOpen ?? false;
  const player = props?.player;
  return isOpen ? (
    <div className={props?.customCLass + " other-stats"}>
      <div className="input-container" style={{ maxWidth: "10rem" }}>
        <p className="stat-label">Strength</p>
        <input type={"number"} value={player?.strength} readOnly></input>
      </div>
      <div className="input-container">
        <p className="stat-label">Dexterity</p>

        <input type={"number"} value={player?.dexterity} readOnly></input>
      </div>
      <div className="input-container">
        <p className="stat-label">Constitution</p>
        <input type={"number"} value={player?.constitution} readOnly></input>
      </div>
      <div className="input-container">
        <p className="stat-label">Intelligence</p>
        <input type={"number"} value={player?.intelligence} readOnly></input>
      </div>
      <div className="input-container">
        <p className="stat-label">Charisma</p>
        <input type={"number"} value={player?.charisma} readOnly></input>
      </div>
      <div className="input-container">
        <p className="stat-label">Wisdom</p>
        <input type={"number"} value={player?.wisdom} readOnly></input>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Table;

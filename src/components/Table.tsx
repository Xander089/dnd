import { useState } from "react";
import "./Table.css";
import warrior from "../assets/warrior.png";
import orc from "../assets/orc.png";
import Icon from "./Icon";
import { Player, PlayerStatus, Spell } from "../types/GameTypes";
import DamageCure from "./dialogs/ModalDamageCure";
import { Dao } from "../data/write";
import Note from "./Note";
import DefeatedLog from "./DefeatedLog";
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
                  addDefeatedLog={props?.addDefeatedLog}
                />
              ))}
            </div>
            <div className={expand ? "tab-right-hidden" : ""}>
              <Note collapse={false} />
              <DefeatedLog entries={props?.defeatedLog ?? []} onClear={props?.clearDefeatedLog} />
              <History
                collapse={false}
                game={props?.game}
                history={props?.history}
                onClear={props?.clearHistory}
              />
            </div>
          </div>
        </div>
      </div>
      <Hud
        game={props?.game}
        setGame={props?.setGame}
        addHistoryRecord={props?.addHistoryRecord}
        handleStatusDurationForPlayer={props?.handleStatusDurationForPlayer}
        refreshPlayingCharacters={props?.refreshPlayingCharacters}
      />
    </>
  );
}

function Member(props: any) {
  const player: Player = props?.player;
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [damageVisible, setDamageVisible] = useState(false);
  const [cureVisible, setCureVisible] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [flash, setFlash] = useState<"cure" | "damage" | null>(null);

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
      statuses: player?.statuses ?? [],
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
    props?.refreshPlayers("currentHp", newHp, player?.id);
    handleStats(newHp);
    props?.applyCureDamageToPlayers(getCurrentPlayer(newHp));

    const heal = sign > 0 ? " applica una cura" : " applica una ferita";
    props?.addHistoryRecord(
      "Il master" + heal + " a " + player?.name + " di " + amount + " punti"
    );

    setFlash(sign > 0 ? "cure" : "damage");
    setTimeout(() => setFlash(null), 2000);
  }

  function removePlayer() {
    props?.removePlayer(player?.id, player?.type);
    props?.addHistoryRecord("il master rimuove " + player?.name + " dal game");
    if (player?.type === "monster") {
      const exp = player?.monsterProperties?.exp ?? 0;
      props?.addDefeatedLog?.(
        `Type: ${player.category} - Name: ${player.name} - EXP: ${exp}`
      );
    }
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

  const updateStatuses = (updated: PlayerStatus[]) => {
    props?.refreshPlayers("statuses", updated, player?.id);
    Dao.writePlayer({ ...getCurrentPlayer(), statuses: updated });
  };

  const selectedClassName = !props?.isSelected ? "" : " memberSelected";
  const colorClassName =
    player?.type === "monster" ? " monster-bg" : " player-bg";

  return (
    <div className={"member-border" + selectedClassName + colorClassName}>
      {flash && <div className={`flash-overlay flash-${flash}`} />}
      {/* <CustomIcon
        size="24px"
        iconClass="game-icon"
        bg={player?.type === "player" ? warrior : orc}
      /> */}
      <div className="member">
        <div 
        style={{ marginLeft: "2rem"}}
        className="input-container larger-container input-name"
        >
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
        <div className="statuses-container">
          <p className="stat-label">Status</p>
          <div className="statuses-list">
            {(player?.statuses ?? []).map((s, i) => (
              <div key={i} className="status-entry">
                <input
                  type="text"
                  placeholder="status"
                  value={s.name}
                  className={s.name !== "" ? "poison" : ""}
                  onChange={(e) =>
                    updateStatuses(
                      (player?.statuses ?? []).map((st, j) =>
                        j === i ? { ...st, name: e.target.value } : st
                      )
                    )
                  }
                />
                <input
                  type="number"
                  placeholder="turns"
                  value={s.duration}
                  onChange={(e) =>
                    updateStatuses(
                      (player?.statuses ?? []).map((st, j) =>
                        j === i
                          ? { ...st, duration: parseInt(e.target.value) || 0 }
                          : st
                      )
                    )
                  }
                />
                <button
                  className="status-remove-btn"
                  onClick={() =>
                    updateStatuses(
                      (player?.statuses ?? []).filter((_, j) => j !== i)
                    )
                  }
                >
                  ×
                </button>
              </div>
            ))}
            <button
              className="status-add-btn"
              onClick={() =>
                updateStatuses([
                  ...(player?.statuses ?? []),
                  { name: "", duration: 0 },
                ])
              }
            >
              +
            </button>
          </div>
        </div>
        <button
          style={{
            background: "transparent",
            border: "none",
          }}
          className="member-button damage-button"
          onClick={openDamageDialog}
        >
          <Icon name="sword" />
        </button>
        <button
          style={{
            background: "transparent",
            border: "none",
          }}
          className="member-button"
          onClick={openCureDialog}
        >
          <Icon name="heart" />
        </button>
        <button
          style={{
            background: "transparent",
            border: "none",
          }}
          className="member-button"
          onClick={() => setRemoveVisible(true)}
        >
          <Icon name="trash" />
        </button>
        <div className="accordion">
          <button
            style={{
              marginTop: "0.5rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              color: "#543213"
            }}
            onClick={handleAccordion}
          >
            {accordionOpen ? "▲" : "▼"}
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
  const player: Player = props?.player;
  const mp = player?.monsterProperties;

  const selectedSpellIds: number[] = mp?.spells ?? [];
  const allSpells: (Spell & { id: number })[] = selectedSpellIds.length > 0 ? Dao.getSpells() : [];
  const selectedSpells = allSpells.filter((s) => selectedSpellIds.includes(s.id));

  const hasTopRow = player?.type === "monster" && !!(mp?.AC || mp?.type || mp?.alignment || mp?.traits || selectedSpells.length > 0);
  const hasMiddleRow = player?.type === "monster" && !!(mp?.actions || mp?.bonus_actions || mp?.legendary_actions);
  const hasBottomRow = player?.type === "monster" && !!(mp?.challenge_rating || mp?.proficiency_bonus || mp?.exp || mp?.savingThrows || mp?.senses || mp?.abilities || mp?.reactions || mp?.resistances || mp?.vulnerability || mp?.damage_immunities || mp?.condition_immunities);
  const hasMonsterProps = hasTopRow || hasMiddleRow || hasBottomRow;

  return isOpen ? (
    <div className={props?.customCLass}>
      <div className="other-stats">
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
      {hasMonsterProps && (
        <div className="other-stats-monster-props">
          {hasTopRow && (
            <div className="other-stats-row">
              {!!mp?.AC && (
                <div className="input-container">
                  <p className="stat-label">AC</p>
                  <input type="number" value={mp.AC} readOnly />
                </div>
              )}
              {!!mp?.type && (
                <div className="input-container">
                  <p className="stat-label">Creature Type</p>
                  <input type="text" value={mp.type} readOnly />
                </div>
              )}
              {!!mp?.alignment && (
                <div className="input-container">
                  <p className="stat-label">Alignment</p>
                  <input type="text" value={mp.alignment} readOnly />
                </div>
              )}
              {!!mp?.traits && (
                <div className="input-container-wide">
                  <p className="stat-label">Special Traits</p>
                  <textarea value={mp.traits} readOnly />
                </div>
              )}
              {selectedSpells.length > 0 && (
                <div className="other-stats-spells">
                  <p className="stat-label">Spells</p>
                  <div className="spell-chips-row">
                    {selectedSpells.map((spell) => (
                      <div key={spell.id} className="spell-chip-wrapper">
                        <span className="spell-chip-label">{spell.name}</span>
                        <div className="spell-tooltip">
                          <p className="spell-tooltip-name">{spell.name}</p>
                          <p><b>School:</b> {spell.school}</p>
                          <p><b>Level:</b> {spell.level}</p>
                          <p><b>Casting Time:</b> {spell.castingTime}{spell.castingTimeEnumValue ? ` ${spell.castingTimeEnumValue}` : ""}</p>
                          <p><b>Range:</b> {spell.range}</p>
                          <p><b>Duration:</b> {spell.duration}{spell.durationEnumValue ? ` ${spell.durationEnumValue}` : ""}</p>
                          {spell.effect && <p><b>Effect:</b> {spell.effect}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {hasMiddleRow && (
            <div className="other-stats-row">
              {!!mp?.actions && (
                <div className="input-container-wide">
                  <p className="stat-label">Actions</p>
                  <textarea value={mp.actions} readOnly />
                </div>
              )}
              {!!mp?.bonus_actions && (
                <div className="input-container-wide">
                  <p className="stat-label">Bonus Actions</p>
                  <textarea value={mp.bonus_actions} readOnly />
                </div>
              )}
              {!!mp?.legendary_actions && (
                <div className="input-container-wide">
                  <p className="stat-label">Legendary Actions</p>
                  <textarea value={mp.legendary_actions} readOnly />
                </div>
              )}
            </div>
          )}
          {hasBottomRow && (
            <div className="other-stats-row">
              {!!mp?.challenge_rating && (
                <div className="input-container">
                  <p className="stat-label">Challenge Rating</p>
                  <input type="number" value={mp.challenge_rating} readOnly />
                </div>
              )}
              {!!mp?.proficiency_bonus && (
                <div className="input-container">
                  <p className="stat-label">Prof. Bonus</p>
                  <input type="number" value={mp.proficiency_bonus} readOnly />
                </div>
              )}
              {!!mp?.exp && (
                <div className="input-container">
                  <p className="stat-label">EXP</p>
                  <input type="number" value={mp.exp} readOnly />
                </div>
              )}
              {!!mp?.savingThrows && (
                <div className="input-container">
                  <p className="stat-label">Saving Throws</p>
                  <input type="text" value={mp.savingThrows} readOnly />
                </div>
              )}
              {!!mp?.senses && (
                <div className="input-container-wide">
                  <p className="stat-label">Senses</p>
                  <textarea value={mp.senses} readOnly />
                </div>
              )}
              {!!mp?.abilities && (
                <div className="input-container-wide">
                  <p className="stat-label">Abilities</p>
                  <textarea value={mp.abilities} readOnly />
                </div>
              )}
              {!!mp?.reactions && (
                <div className="input-container-wide">
                  <p className="stat-label">Reactions</p>
                  <textarea value={mp.reactions} readOnly />
                </div>
              )}
              {!!mp?.resistances && (
                <div className="input-container-wide">
                  <p className="stat-label">Resistances</p>
                  <textarea value={mp.resistances} readOnly />
                </div>
              )}
              {!!mp?.vulnerability && (
                <div className="input-container-wide">
                  <p className="stat-label">Vulnerabilities</p>
                  <textarea value={mp.vulnerability} readOnly />
                </div>
              )}
              {!!mp?.damage_immunities && (
                <div className="input-container-wide">
                  <p className="stat-label">Dmg. Immunities</p>
                  <textarea value={mp.damage_immunities} readOnly />
                </div>
              )}
              {!!mp?.condition_immunities && (
                <div className="input-container-wide">
                  <p className="stat-label">Cond. Immunities</p>
                  <textarea value={mp.condition_immunities} readOnly />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}

export default Table;

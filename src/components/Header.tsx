import "./Header.css";
import monster from "../assets/monster.png";
import storm from "../assets/storm.png";
import roll from "../assets/roll.png";
import { Game } from "../types/Game";

function Header(props: any) {
  const showAddMonstersModal = () => {
    props?.setChooseMonstersVisible(!props?.chooseMonstersVisible);
  };

  return (
    <div className="header">
      <div className="header-container">
        <h4
          style={{
            fontSize: "1.3rem",
            margin: "0",
            marginLeft: "1rem",
            width: "0",
          }}
        >
          Game
        </h4>
        <Effect
          game={props?.game}
          applyGlobalEffect={props?.applyGlobalEffect}
        />

        <div className="header-container-buttons">
          <ButtonWithToolTip
            customClass="header-button-tooltip"
            onClick={showAddMonstersModal}
            image={monster}
            description="Monsters"
          />
          <ButtonWithToolTip
            customClass="header-button-tooltip"
            onClick={() => {
              props?.setEffectVisible(true);
            }}
            image={storm}
            description="Effect"
          />
          <ButtonWithToolTip
            customClass="header-button-tooltip"
            onClick={() => {
              props?.roll();
              props?.addHistoryRecord("Il master applica un roll manuale");
            }}
            image={roll}
            description="Roll"
          />
          <button
            className="header-button-tooltip"
            onClick={() => props?.setExpand(!props?.expand)}
          >
            Side
          </button>
        </div>
      </div>
    </div>
  );
}

function ButtonWithToolTip(props: any) {
  return (
    <div>
      <button className={props?.customClass ?? ""} onClick={props?.onClick}>
        {props?.description}
      </button>
    </div>
  );
}

function Effect(props: any) {
  const game: Game = props?.game;
  const effect = game.effectName;
  const duration = game.effectDuration;
  const effectIsOver = effect === "" && duration === 0;

  if (effect !== "" && duration === 0) {
    props?.applyGlobalEffect("", 0);
  }

  return effectIsOver ? (
    <></>
  ) : (
    <div className="header-effect">
      <p style={{ margin: "0.25rem" }}>
        Effect<span style={{ fontWeight: "bold" }}>{" " + effect}</span> still
        active for {duration} steps
      </p>
    </div>
  );
}

export default Header;

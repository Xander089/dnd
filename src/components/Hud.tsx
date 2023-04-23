import "./Hud.css";
import back from "../assets/back.png";
import forward from "../assets/forward.png";
import CustomIcon from "./layout/CustomIcon";
import { decrement, Game, increment } from "../types/Game";
import { Dao } from "../data/write";
import ModalEditGame from "./dialogs/ModalEditGame";
import { useState } from "react";

function Hud(props: any) {
  const className = "hud ";
  const [editGameVisible, setEditGameVisible] = useState(false);
  const handleIncrement = () => {
    const game = increment(props?.game);
    Dao.writeGame(game);
    props?.setGame(Dao.getGame());

    props?.addHistoryRecord("Il Master passa al turno successivo");
    props?.handleStatusDuration(1);
  };

  const handleDecrement = () => {
    const game = decrement(props?.game);
    Dao.writeGame(game);
    Dao.updateGameEffect("", 0); //se torno indietro azzero l'effetto globale
    props?.setGame(Dao.getGame());

    props?.addHistoryRecord("Il Master torna al turno precedente");
    props?.handleStatusDuration(-1);
  };

  const handleReset = () => {
    Dao.resetGame();
    props?.setGame(Dao.getGame());
    props?.addHistoryRecord("Il gioco viene resettato");
  };

  const modifyGame = (turns: number, steps: number) => {
    const countPartecipants = Dao.getGame().count;
    const step_ = Math.max(0, steps - 1);
    const game: Game = {
      turn: turns,
      step: Math.min(step_, countPartecipants), //per evitare di scrivere + di count
      count: countPartecipants,
      effectName: "",
      effectDuration: 0,
    };
    Dao.writeGame(game);
    Dao.updateGameEffect("", 0);
    props?.setGame(Dao.getGame());
  };

  return (
    <div className={className}>
      <div className="hud-container">
        <div className="hud-left-buttons">
          <button
            className="hud-arrow"
            style={{ width: "2.5rem" }}
            onClick={handleDecrement}
          >
            <CustomIcon bg={back} />
          </button>

          <button
            className="hud-arrow"
            style={{ width: "2.5rem" }}
            onClick={handleIncrement}
          >
            <CustomIcon bg={forward} />
          </button>
          <p className="current-turn">
            <b>
              Turn {props?.game?.turn} - Step {props?.game?.step + 1} /{" "}
              {props?.game?.count}
            </b>
          </p>
          <button
            onClick={() => setEditGameVisible(true)}
            style={{ width: "4rem" }}
          >
            Edit
          </button>
        </div>
        <div className="hud-right-buttons">
          <button style={{ width: "4rem" }} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      <ModalEditGame
        editGameVisible={editGameVisible}
        setEditGameVisible={setEditGameVisible}
        modifyGame={modifyGame}
        game={props?.game}
      />
    </div>
  );
}

export default Hud;

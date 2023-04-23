import { useState } from "react";
import "../../App.css";
import "./ModalGlobalEffect.css";
import Dialog from "../layout/dialog";

function ModalEditGame(props: any) {
  const [turns, setTurns] = useState(0);
  const [steps, setSteps] = useState(1);
  const visible: boolean = props?.editGameVisible ?? false;
  const setVisible: (visible: boolean) => void = props?.setEditGameVisible;

  function handleOk() {
    props?.modifyGame(turns, steps);
    setVisible(false);
  }

  return visible ? (
    <Dialog>
      <div className="modal-effect">
        <div className="modal-title">
          <h3>Edit Game</h3>
        </div>
        <div className="input-container">
          <p>Turns</p>
          <input
            type={"number"}
            className=""
            value={turns}
            onChange={(event: any) =>
              setTurns(Math.max(0, event?.target?.value))
            }
          />
        </div>
        <div className="input-container">
          <p>Steps</p>

          <input
            type={"number"}
            className=""
            value={steps}
            onChange={
              (event: any) =>
                setSteps(
                  Math.min(Math.max(1, event?.target?.value), props?.game.count)
                ) //compreso tra 1 e il nr di partecipanti
            }
          />
        </div>
      </div>
      <div className="effect-buttons">
        <button style={{ width: "5rem" }} onClick={() => setVisible(false)}>
          Cancel
        </button>
        <button
          style={{ width: "5rem", background: "var(--red)", color: "#eee" }}
          onClick={handleOk}
        >
          Ok
        </button>
      </div>
    </Dialog>
  ) : (
    <></>
  );
}

export default ModalEditGame;

import { useState } from "react";
import "../../App.css";
import "./ModalGlobalEffect.css";
import Dialog from "../layout/dialog";

function ModalGlobalEffect(props: any) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);
  const visible: boolean = props?.effectVisible ?? false;
  const setVisible: (visible: boolean) => void = props?.setEffectVisible;

  function handleOk() {
    props?.applyGlobalEffect(name, duration);
    props?.addHistoryRecord(
      "Il master applica l'effetto " +
        name +
        " al gioco per" +
        duration +
        (duration > 1 ? " turni" : " turno")
    );
    setVisible(false);
  }

  return visible ? (
    <Dialog>
      <div className="modal-effect">
        <div className="modal-title">
          <h3>Insert Global Effect</h3>
        </div>
        <div className="input-container">
          <p>Name</p>
          <input
            type={"text"}
            className=""
            value={name}
            onChange={(event: any) => setName(event?.target?.value)}
          />
        </div>
        <div className="input-container">
          <p>Duration</p>

          <input
            type={"number"}
            className=""
            value={duration}
            onChange={(event: any) => setDuration(event?.target?.value)}
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

export default ModalGlobalEffect;

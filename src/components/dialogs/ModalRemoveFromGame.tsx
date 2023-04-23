import "../../App.css";
import Dialog from "../layout/dialog";
import "./ModalRemoveFromGame.css";

function ModalRemoveFromGame(props: any) {
  const handleRemove = () => {
    props?.removePlayer();
    props?.setRemoveVisible(false);
  };

  return props?.removeVisible ? (
    <Dialog>
      <div className="modal-content modal-delete-content">
        <div className="modal-title">
          <h3>Remove {props?.type}</h3>
        </div>
        <p>
          Are you sure to remove <b>{props?.name}</b> from the current game?
        </p>
        <div className="modal-delete-button">
          <button
            style={{ width: "5rem" }}
            onClick={() => props?.setRemoveVisible(false)}
          >
            Cancel
          </button>
          <button
            style={{ width: "5rem", background: "var(--red)", color: "#eee" }}
            onClick={handleRemove}
          >
            Ok
          </button>
        </div>
      </div>
    </Dialog>
  ) : (
    <></>
  );
}

export default ModalRemoveFromGame;

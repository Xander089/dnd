import "../../App.css";
import Dialog from "../layout/dialog";
import "./ModalDelete.css";

function ModalRemoveMonsters({
  visible,
  onYes,
  onNo,
}: {
  visible: boolean;
  onYes: () => void;
  onNo: () => void;
}) {
  return visible ? (
    <Dialog onClose={onNo}>
      <div className="modal-content modal-delete-content">
        <div className="modal-title">
          <h3>Remove all monsters?</h3>
        </div>
        <div className="modal-delete-button">
          <button style={{ width: "5rem" }} onClick={onNo}>
            No
          </button>
          <button
            style={{ width: "5rem", background: "var(--red)", color: "#eee" }}
            onClick={onYes}
          >
            Yes
          </button>
        </div>
      </div>
    </Dialog>
  ) : (
    <></>
  );
}

export default ModalRemoveMonsters;

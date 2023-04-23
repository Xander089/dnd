import "../../App.css";
import Dialog from "../layout/dialog";
import "./ModalDelete.css";
function ModalDelete(props: any) {
  const handleDelete = () => {
    props?.deletePlayer();
    props?.setDeleteVisible(false);
  };

  return props?.deleteVisible ? (
    <Dialog>
      <div className="modal-content modal-delete-content">
        <div className="modal-title">
          <h3>Remove {props?.type}</h3>
        </div>
        <p>
          Are you sure to delete <b>{props?.name}</b>?
        </p>
        <div className="modal-delete-button">
          <button
            style={{ width: "5rem" }}
            onClick={() => props?.setDeleteVisible(false)}
          >
            Cancel
          </button>
          <button
            style={{ width: "5rem", background: "var(--red)", color: "#eee" }}
            onClick={handleDelete}
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

export default ModalDelete;

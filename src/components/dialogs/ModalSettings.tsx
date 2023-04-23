import { useState } from "react";
import "../../App.css";
import "./ModalSettings.css";
import Dialog from "../layout/dialog";
import { Dao } from "../../data/write";

function ModalSettings(props: any) {
  const [download, setDownload] = useState(Dao.getAllLocalStorage());
  const visible: boolean = props?.visible ?? false;
  const setVisible: (visible: boolean) => void = props?.setVisible;

  function handleCopy() {
    navigator.clipboard.writeText(download);
  }
  function handleApply() {
    Dao.writeAllLocalStorage(download);
  }
  function handleVisible() {
    setVisible(!visible);
  }

  return visible ? (
    <Dialog>
      <div className="modal-content modal-settings">
        <div className="modal-title">
          <h3>Settings</h3>
        </div>
        <p className="settings-subtitles">Export/Import</p>
        <div className="input-container">
          <textarea
            className="settings-download-textarea"
            value={download}
            onChange={(event: any) => setDownload(event?.target?.value)}
          />
        </div>
        <div className="settings-buttons settings-buttons-small">
          <button style={{ width: "5rem" }} onClick={handleCopy}>
            Copy
          </button>
          <button style={{ width: "5rem" }} onClick={handleApply}>
            Apply
          </button>
        </div>
        <div className="settings-buttons">
          <button style={{ width: "5rem" }} onClick={handleVisible}>
            Close
          </button>
        </div>
      </div>
    </Dialog>
  ) : (
    <></>
  );
}

export default ModalSettings;

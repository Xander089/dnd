import { useState } from "react";
import "./History.css";
import Dialog from "./layout/dialog";
import "./dialogs/ModalDelete.css";

function History(props: any) {
  const splitHistory: string[] = props?.history;
  const [collapsed, setCollapsed] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const onClear = props?.onClear;

  return (
    <div className="history-title">
      <div className="collapsible-header" onClick={() => setCollapsed((c) => !c)}>
        <span>History</span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {onClear && (
            <button
              className="log-clear-button"
              onClick={(e) => { e.stopPropagation(); setConfirmVisible(true); }}
              title="Clear history"
            >✕</button>
          )}
          <span>{collapsed ? "▲" : "▼"}</span>
        </div>
      </div>
      {!collapsed && (
        <div className="history">
          <div className="history-container">
            <ul>
              {splitHistory?.map((it, index) => (
                <li key={index + "_history"}>
                  <p key={index + "_history"}>{it}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {confirmVisible && (
        <Dialog onClose={() => setConfirmVisible(false)}>
          <div className="modal-content modal-delete-content">
            <div className="modal-title">
              <h3>Clear history?</h3>
            </div>
            <div className="modal-delete-button">
              <button style={{ width: "5rem" }} onClick={() => setConfirmVisible(false)}>
                No
              </button>
              <button
                style={{ width: "5rem", background: "var(--red)", color: "#eee" }}
                onClick={() => { onClear(); setConfirmVisible(false); }}
              >
                Yes
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default History;

import { useState } from "react";
import "./DefeatedLog.css";
import Dialog from "./layout/dialog";
import "./dialogs/ModalDelete.css";

function DefeatedLog({ entries, onClear }: { entries: string[]; onClear?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <div className="defeated-log">
      <div
        className="collapsible-header"
        onClick={() => setCollapsed((c) => !c)}
      >
        <span>Defeated ({entries.length})</span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {onClear && (
            <button
              className="log-clear-button"
              onClick={(e) => { e.stopPropagation(); setConfirmVisible(true); }}
              title="Clear log"
            >✕</button>
          )}
          <span>{collapsed ? "▲" : "▼"}</span>
        </div>
      </div>
      {!collapsed && (
        <textarea value={entries.join("\n")} readOnly />
      )}
      {confirmVisible && (
        <Dialog onClose={() => setConfirmVisible(false)}>
          <div className="modal-content modal-delete-content">
            <div className="modal-title">
              <h3>Clear defeated log?</h3>
            </div>
            <div className="modal-delete-button">
              <button style={{ width: "5rem" }} onClick={() => setConfirmVisible(false)}>
                No
              </button>
              <button
                style={{ width: "5rem", background: "var(--red)", color: "#eee" }}
                onClick={() => { onClear!(); setConfirmVisible(false); }}
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

export default DefeatedLog;

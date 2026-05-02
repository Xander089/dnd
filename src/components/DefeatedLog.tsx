import { useState } from "react";
import "./DefeatedLog.css";

function DefeatedLog({ entries, onClear }: { entries: string[]; onClear?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);

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
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              title="Clear log"
            >✕</button>
          )}
          <span>{collapsed ? "▲" : "▼"}</span>
        </div>
      </div>
      {!collapsed && (
        <textarea value={entries.join("\n")} readOnly />
      )}
    </div>
  );
}

export default DefeatedLog;

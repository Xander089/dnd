import { useState } from "react";
import "./History.css";

function History(props: any) {
  const splitHistory: string[] = props?.history;
  const [collapsed, setCollapsed] = useState(false);

  const onClear = props?.onClear;

  return (
    <div className="history-title">
      <div className="collapsible-header" onClick={() => setCollapsed((c) => !c)}>
        <span>History</span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {onClear && (
            <button
              className="log-clear-button"
              onClick={(e) => { e.stopPropagation(); onClear(); }}
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
    </div>
  );
}

export default History;

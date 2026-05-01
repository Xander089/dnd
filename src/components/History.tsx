import { useState } from "react";
import "./History.css";

function History(props: any) {
  const splitHistory: string[] = props?.history;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="history-title">
      <div className="collapsible-header" onClick={() => setCollapsed((c) => !c)}>
        <span>History</span>
        <span>{collapsed ? "▲" : "▼"}</span>
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

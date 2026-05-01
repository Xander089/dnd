import { useState } from "react";
import "./DefeatedLog.css";

function DefeatedLog({ entries }: { entries: string[] }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="defeated-log">
      <div
        className="collapsible-header"
        onClick={() => setCollapsed((c) => !c)}
      >
        <span>Defeated ({entries.length})</span>
        <span>{collapsed ? "▲" : "▼"}</span>
      </div>
      {!collapsed && (
        <textarea value={entries.join("\n")} readOnly />
      )}
    </div>
  );
}

export default DefeatedLog;

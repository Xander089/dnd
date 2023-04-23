import { useEffect, useState } from "react";
import "./History.css";

function History(props: any) {
  const splitHistory: string[] = props?.history;

  return (
    <div className="history-title">
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
    </div>
  );
}

export default History;

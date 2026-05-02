import { useState } from "react";
import "./MonsterHeader.css";

function MonsterHeader(props: any) {
  const [searched, setSearched] = useState("");

  const handleSearch = (text: string) => {
    setSearched(text);
    props?.filterPlayers(text);
  };
  const customHeader = "header " + (props?.customHeaderClass ?? "")
  return (
    <div className={customHeader}>
      <div className="header-container header-container-monsters">
        <h4
          style={{
            fontSize: "1.3rem",
            margin: "0",
            marginLeft: "1rem",
            width: "0",
          }}
        >
          {props?.Title}
        </h4>
        <div className="input-container search-container player-search">
          <input
            className="search-input"
            type={"text"}
            placeholder="Search"
            value={searched}
            onChange={(event: any) => handleSearch(event?.target.value)}
          ></input>
        </div>
        <MonsterButtonWithToolTip
          onClick={() => {
            props?.setShowAddNew(!props?.showAddNew);
          }}
          description="Add"
        />
      </div>
    </div>
  );
}

function MonsterButtonWithToolTip(props: any) {
  return (
    <div>
      <button className="add-circle-btn" onClick={props?.onClick}>+</button>
    </div>
  );
}

export default MonsterHeader;

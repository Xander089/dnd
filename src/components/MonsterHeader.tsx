import { useState } from "react";
import "./MonsterHeader.css";

function MonsterHeader(props: any) {
  const [searched, setSearched] = useState("");

  const handleSearch = (text: string) => {
    setSearched(text);
    props?.filterPlayers(text);
  };

  return (
    <div className="header ">
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
          description="Add New"
        />
      </div>
    </div>
  );
}

function MonsterButtonWithToolTip(props: any) {
  return (
    <div>
      <button style={{ width: "5rem" }} onClick={props?.onClick}>
        {props?.description}
      </button>
    </div>
  );
}

export default MonsterHeader;

import "../../App.css";
import "./ModalChooseMonsters.css";
import Dialog from "../layout/dialog";
import { useState } from "react";
import { Dao } from "../../data/write";
import { MonsterSelection } from "../../types/GameTypes";

function ChooseMonsters(props: any) {
  const visible: boolean = props?.visible ?? false;
  const setVisible: (visible: boolean) => void = props?.setVisible;
  const [searched, setSearched] = useState("");
  function handleVisible() {
    setVisible(!visible);
  }

  function handleOk() {
    props?.addMonstersToGame();
    props?.refreshGame(); //refresh dell'hud
    setVisible(!visible);
  }

  const monstersCategories: MonsterSelection[] = props?.monstersCategories;

  const handleKeyDown = (event: any, monster: MonsterSelection) => {
    if (event.key === "Enter") {
      props?.handleSelection(!monster?.isSelected, monster?.id);
    }
  };

  return visible ? (
    <Dialog>
      <div className="modal-title modal-choose-title">
        <h3>Select monsters</h3>
      </div>

      <div className="input-container search-container">
        <input
          className="search-input"
          type={"text"}
          placeholder="Search"
          value={searched}
          onChange={(event: any) => setSearched(event?.target.value)}
        ></input>
      </div>
      <div className="choose-monsters-header">
        <p>
          <b>Select</b>
        </p>
        <p>
          <b>Type</b>
        </p>
        <p>
          <b>Quantity</b>
        </p>
      </div>
      <div className="monster-category-list">
        {monstersCategories
          ?.filter((m) =>
            m.category.toLowerCase().includes(searched.toLowerCase())
          )
          ?.map((it) => (
            <div
              key={"monster-category-row-" + it.category + "-" + it.id}
              className="monster-category-row"
            >
              <input
                className="select-monster-checkbox"
                type={"checkbox"}
                checked={it?.isSelected}
                onKeyDown={(event: any) => handleKeyDown(event, it)}
                onChange={() => props?.handleSelection(!it?.isSelected, it?.id)}
              ></input>
              <p>{it.category}</p>
              <input
                type={"number"}
                value={it.quantity}
                onChange={(e: any) =>
                  props?.handleQuantity(e.target.value, it?.id)
                }
              ></input>
            </div>
          )) ?? <></>}
      </div>
      <div className="search-modal-buttons">
        <button style={{ width: "5rem" }} onClick={handleVisible}>
          Cancel
        </button>
        <button
          style={{ width: "5rem", background: "var(--red)", color: "#eee" }}
          onClick={handleOk}
        >
          Ok
        </button>
      </div>
    </Dialog>
  ) : (
    <></>
  );
}

export default ChooseMonsters;

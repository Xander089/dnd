import { useState } from "react";
import "./Sidebar.css";
import monster from "../assets/monster-page.png";
import party from "../assets/party.png";
import game from "../assets/game.png";
import settings from "../assets/settings.png";
import CustomIcon from "./layout/CustomIcon";

function Sidebar(props: any) {
  function handleSettings() {
    props?.setSettingsVisible(!props?.settingsVisible);
  }
  const className = "sidebar sidebar-container ";
  return (
    <div className={className}>
      <nav className="navbar">
        <ButtonWithToolTip
          btnClassName={props?.pageSelected === 0 ? "buttonSelected" : ""}
          onClick={() => props?.setPageSelected(0)}
          image={game}
          description="Game"
        />

        <ButtonWithToolTip
          btnClassName={props?.pageSelected === 1 ? "buttonSelected" : ""}
          onClick={() => props?.setPageSelected(1)}
          image={party}
          description="Party"
        />

        <ButtonWithToolTip
          btnClassName={props?.pageSelected === 2 ? "buttonSelected" : ""}
          onClick={() => props?.setPageSelected(2)}
          image={monster}
          description="Monsters"
        />
      </nav>
      <div className="settings tooltip">
        <button style={{ border: "none" }} onClick={handleSettings}>
          <CustomIcon bg={settings} />
        </button>
      </div>
    </div>
  );
}

function ButtonWithToolTip(props: any) {
  return (
    <div className={"tooltip " + props?.btnClassName}>
      <button style={{ border: "none" }} onClick={props?.onClick}>
        <CustomIcon bg={props?.image} />
      </button>
    </div>
  );
}

export default Sidebar;

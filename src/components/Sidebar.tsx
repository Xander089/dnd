import { useState } from "react";
import "./Sidebar.css";
import Icon from "./Icon";

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
          iconName="table"
          description="Game"
        />

        <ButtonWithToolTip
          btnClassName={props?.pageSelected === 1 ? "buttonSelected" : ""}
          onClick={() => props?.setPageSelected(1)}
          iconName="party"
          description="Party"
        />

        <ButtonWithToolTip
          btnClassName={props?.pageSelected === 2 ? "buttonSelected" : ""}
          onClick={() => props?.setPageSelected(2)}
          iconName="monster"
          description="Monsters"
        />
        <ButtonWithToolTip
          btnClassName={props?.pageSelected === 3 ? "buttonSelected" : ""}
          onClick={() => props?.setPageSelected(3)}
          iconName="grimoire"
          description="Grimoire"
        />
      </nav>
      <div className="settings tooltip">
        <button style={{ border: "none" }} onClick={handleSettings}>
          <Icon name="settings" />
        </button>
      </div>
    </div>
  );
}

function ButtonWithToolTip(props: any) {
  return (
    <div className={"tooltip " + props?.btnClassName}>
      <button style={{ border: "none" }} onClick={props?.onClick}>
        <Icon name={props?.iconName} />
      </button>
    </div>
  );
}

export default Sidebar;

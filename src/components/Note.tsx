import { useState } from "react";
import "./Note.css";

const noteTag = "globalNote";

function Note(props: any) {
  const [note, setNote] = useState(fetchNote());
  const [collapsed, setCollapsed] = useState(false);

  const handleWrite = (event: any) => {
    const typedText = event.target.value;
    setNote(typedText);
  };

  const handleBlur = () => {
    writeNote(note);
  };

  return (
    <div className="note">
      <div className="collapsible-header" onClick={() => setCollapsed((c) => !c)}>
        <span>Note</span>
        <span>{collapsed ? "▲" : "▼"}</span>
      </div>
      {!collapsed && (
        <textarea value={note} onChange={handleWrite} onBlur={handleBlur} />
      )}
    </div>
  );
}

function fetchNote(): string {
  const note = localStorage?.getItem(noteTag) ?? "";
  return note;
}

function writeNote(currentNote: string) {
  localStorage.setItem(noteTag, currentNote);
}

export default Note;

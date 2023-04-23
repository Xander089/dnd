import { useState } from "react";
import "./Note.css";

const noteTag = "globalNote";

function Note(props: any) {
  const [note, setNote] = useState(fetchNote());

  const handleWrite = (event: any) => {
    const typedText = event.target.value;
    setNote(typedText);
  };

  const handleBlur = () => {
    writeNote(note);
  };
  const className = "note "; //+ (props?.collapse ? "collapse" : "");
  return (
    <div className={className}>
      <textarea
        value={note}
        onChange={handleWrite}
        onBlur={handleBlur}
      ></textarea>
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

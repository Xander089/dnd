import "../App.css";
import "./Grimoire.css";
import { useState } from "react";
import trash from "../assets/trash3.png";
import CustomIcon from "./layout/CustomIcon";
import ModalDelete from "./dialogs/ModalDelete";
import { Spell } from "../types/GameTypes";
import { Dao } from "../data/write";
import MonsterHeader from "./MonsterHeader";

type SpellEntry = Spell & { id: number };

export default function Grimoire() {
  const [spells, setSpells] = useState<SpellEntry[]>(Dao.getSpells());
  const [showAddNew, setShowAddNew] = useState(false);

  const handleAdd = (spell: SpellEntry) => {
    setSpells((prev) => [...prev, spell]);
  };

  const handleDelete = (id: number) => {
    Dao.deleteSpell(id);
    setSpells((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdate = (id: number, spell: Spell) => {
    Dao.updateSpell(id, spell);
    setSpells((prev) => prev.map((s) => (s.id === id ? { ...spell, id } : s)));
  };

  const filterSpells = (searched: string) => {
    const all = Dao.getSpells();
    setSpells(
      searched === ""
        ? all
        : all.filter((s) =>
            s.name.toLowerCase().includes(searched.toLowerCase())
          )
    );
  };

  return (
    <>
      <MonsterHeader
        Title="Grimoire"
        showAddNew={showAddNew}
        setShowAddNew={setShowAddNew}
        filterPlayers={filterSpells}
      />
      <div className="tab">
        <div className="tab-container">
          <div className="monster-tab-sub-container">
            <div className="member-surrounder">
              {showAddNew && (
                <AddSpell
                  setShowAddNew={setShowAddNew}
                  onAdd={handleAdd}
                />
              )}
              {spells.map((spell) => (
                <SpellRow
                  key={spell.id}
                  spell={spell}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SpellRow({
  spell,
  onDelete,
  onUpdate,
}: {
  spell: SpellEntry;
  onDelete: (id: number) => void;
  onUpdate: (id: number, spell: Spell) => void;
}) {
  const [name, setName] = useState(spell.name);
  const [school, setSchool] = useState(spell.school);
  const [level, setLevel] = useState(spell.level);
  const [castingTime, setCastingTime] = useState(spell.castingTime);
  const [range, setRange] = useState(spell.range);
  const [duration, setDuration] = useState(spell.duration);
  const [effect, setEffect] = useState(spell.effect);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const save = () => {
    onUpdate(spell.id, { name, school, level, castingTime, range, duration, effect });
  };

  return (
    <div className="member-border">
      <div className="member spell-row">
        <div className="input-container spell-name-container">
          <p className="stat-label">Name</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={save} />
        </div>
        <div className="input-container">
          <p className="stat-label">School</p>
          <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} onBlur={save} />
        </div>
        <div className="input-container spell-number">
          <p className="stat-label">Level</p>
          <input type="number" value={level} onChange={(e) => setLevel(parseInt(e.target.value) || 0)} onBlur={save} />
        </div>
        <div className="input-container spell-number">
          <p className="stat-label">Cast Time</p>
          <input type="number" value={castingTime} onChange={(e) => setCastingTime(parseInt(e.target.value) || 0)} onBlur={save} />
        </div>
        <div className="input-container spell-number">
          <p className="stat-label">Range</p>
          <input type="number" value={range} onChange={(e) => setRange(parseInt(e.target.value) || 0)} onBlur={save} />
        </div>
        <div className="input-container spell-number">
          <p className="stat-label">Duration</p>
          <input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value) || 0)} onBlur={save} />
        </div>
        <div className="input-container spell-effect-container">
          <p className="stat-label">Effect</p>
          <input type="text" value={effect} onChange={(e) => setEffect(e.target.value)} onBlur={save} />
        </div>
        <div className="button-trash-container">
          <button
            style={{ marginTop: "0.5rem", background: "transparent", border: "none" }}
            onClick={() => setDeleteVisible(true)}
          >
            <CustomIcon bg={trash} />
          </button>
          {deleteVisible && (
            <ModalDelete
              deletePlayer={() => onDelete(spell.id)}
              setDeleteVisible={setDeleteVisible}
              deleteVisible={deleteVisible}
              name={spell.name}
              type="Spell"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function AddSpell({
  setShowAddNew,
  onAdd,
}: {
  setShowAddNew: (v: boolean) => void;
  onAdd: (spell: SpellEntry) => void;
}) {
  const [spell, setSpell] = useState<Spell>({
    name: "",
    school: "",
    level: 0,
    castingTime: 0,
    range: 0,
    duration: 0,
    effect: "",
  });

  const isDisabled =
    spell.name === "" || spell.school === "" || spell.effect === "";

  const handleAdd = () => {
    const newSpell = Dao.addSpell(spell);
    onAdd(newSpell);
    setShowAddNew(false);
  };

  const set = (field: keyof Spell, value: any) =>
    setSpell((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="member-border">
      <div className="member spell-row">
        <div className="input-container spell-name-container">
          <p className="stat-label">Name</p>
          <input type="text" value={spell.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div className="input-container">
          <p className="stat-label">School</p>
          <input type="text" value={spell.school} onChange={(e) => set("school", e.target.value)} />
        </div>
        <div className="input-container spell-number">
          <p className="stat-label">Level</p>
          <input type="number" value={spell.level} onChange={(e) => set("level", parseInt(e.target.value) || 0)} />
        </div>
        <div className="input-container spell-number">
          <p className="stat-label">Cast Time</p>
          <input type="number" value={spell.castingTime} onChange={(e) => set("castingTime", parseInt(e.target.value) || 0)} />
        </div>
        <div className="input-container spell-number">
          <p className="stat-label">Range</p>
          <input type="number" value={spell.range} onChange={(e) => set("range", parseInt(e.target.value) || 0)} />
        </div>
        <div className="input-container spell-number">
          <p className="stat-label">Duration</p>
          <input type="number" value={spell.duration} onChange={(e) => set("duration", parseInt(e.target.value) || 0)} />
        </div>
        <div className="input-container spell-effect-container">
          <p className="stat-label">Effect</p>
          <input type="text" value={spell.effect} onChange={(e) => set("effect", e.target.value)} />
        </div>
        <div className="button-trash-container">
          <button className="add-button add-button-monsters" disabled={isDisabled} onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

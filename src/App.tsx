import { useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Table from "./components/Table";
import Settings from "./components/dialogs/ModalSettings";
import ChooseMonsters from "./components/dialogs/ModalChooseMonsters";
import Party from "./components/Party";
import Monsters from "./components/Monsters";
import Grimoire from "./components/Grimoire";
import { Dao, History } from "./data/write";
import { Game } from "./types/Game";
import { ViewModel } from "./ViewModel";
import { Player } from "./types/GameTypes";

function App() {
  // ViewModel.reset();
  const [players, setPlayers] = useState(ViewModel.getPlayersInitialState()); //initial state
  const [pageSelected, setPageSelected] = useState(0);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2000);
  };
  const [chooseMonstersVisible, setChooseMonstersVisible] = useState(false);
  const [enlarge, setEnlarge] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [game, setGame] = useState(Dao.getGame() as Game);
  const [history, setHistory] = useState(History.getAll());
  const [monstersCategories, setMonstersCategories] = useState(
    ViewModel.sort(ViewModel.getCategories())
  );

  const addHistoryRecord = (sentence: string) => {
    History.addLine(sentence);
    setHistory(History.getAll());
  };

  const refreshMonstersCategories = () => {
    setMonstersCategories(ViewModel.sort(ViewModel.getCategories()));
  };

  const applyGlobalEffect = (name: string, duration: number) => {
    Dao.updateGameEffect(name, duration);
    setGame(Dao.getGame());
  };

  const handleSelection = (isSelected: boolean, id: number) => {
    setMonstersCategories(
      ViewModel.sort(
        ViewModel.selectCategory(monstersCategories, id, isSelected)
      )
    );
  };

  const handleQuantity = (quantity: any, id: number) => {
    const quantity_ = quantity as number;
    setMonstersCategories(
      ViewModel.sort(
        ViewModel.updateQuantity(monstersCategories, id, quantity_)
      )
    );
  };

  const handleManualRoll = (manualRoll: any, id: number) => {
    const roll = parseInt(manualRoll) || 0;
    setMonstersCategories(
      ViewModel.sort(
        ViewModel.updateManualRoll(monstersCategories, id, roll)
      )
    );
  };

  const addMonstersToGame = () => {
    Dao.addMonstersToGame(monstersCategories);
    setPlayers(ViewModel.getPlayersInitialState());
  };

  const applyCureDamageToPlayers = (a: Player) => {
    setPlayers(
      ViewModel.sortPlayers([a, ...players.filter((b) => b.id !== a.id)])
    );
  };

  const removePlayer = (id: number, type: string) => {
    setPlayers(ViewModel.sortPlayers([...players.filter((p) => p.id !== id)]));
    Dao.removePlayer(id, type); //mette isplaying a false oppure delete dei monster
    refreshGame();
  };

  const applyManualRoll = () => {
    const playersSortedWithManualRoll = ViewModel.manualRoll(players);

    //update dei giocatori che hanno subito modifica iniziativa
    playersSortedWithManualRoll
      .filter((p) => p.type === "monster")
      .forEach((m) => Dao.writePlayer(m));

    setPlayers(playersSortedWithManualRoll);
  };

  const refreshPlayers = (key: string, value: any, id: number) => {
    const playerToChange = players?.filter((p) => p.id === id)[0];
    const updatedPlayer: Player = {
      category: playerToChange?.category,
      charisma: playerToChange?.charisma,
      constitution: playerToChange?.constitution,
      currentHp: key === "currentHp" ? value : playerToChange?.currentHp,
      dexterity: playerToChange?.dexterity,
      hp: playerToChange?.hp,
      id: playerToChange?.id,
      initiative: key === "initiative" ? value : playerToChange?.initiative,
      intelligence: playerToChange?.intelligence,
      isPlaying: playerToChange?.isPlaying,
      name: playerToChange?.name,
      statuses: key === "statuses" ? value : playerToChange?.statuses ?? [],
      strength: playerToChange?.strength,
      type: playerToChange?.type,
      wisdom: playerToChange?.wisdom,
      monsterProperties: playerToChange?.monsterProperties,
    };

    setPlayers(
      ViewModel.sortPlayers([
        ...players?.filter((p) => p.id !== id),
        updatedPlayer,
      ])
    );

    lifeCheck(updatedPlayer);
  };

  function lifeCheck(player: Player) {
    const isStillPlayerAlive = player.currentHp !== 0;
    if (!isStillPlayerAlive) {
    }
  }

  const refreshGame = () => {
    Dao.resetGame(); //aggiorno il counter dei turni
    setGame(Dao.getGame()); //aggiorno l'hud
  };

  const handleStatusDuration = (step: number) => {
    ViewModel.updateStatusDuration(step);
    setPlayers(ViewModel.getPlayersInitialState());
  };

  const handleStatusDurationForPlayer = (stepIndex: number) => {
    const player = players[stepIndex];
    if (!player) return;
    const updatedStatuses = (player.statuses ?? [])
    .map((s) => {
      const newDuration = Math.max(0, s.duration - 1);
      if (s.duration === 1) {
        addToast(`${player.name} has no more ${s.name}`);
      }
      return { ...s, duration: newDuration };
    })
    .filter((s) => s.duration > 0);
    const updatedPlayer = { ...player, statuses: updatedStatuses };
    Dao.writePlayer(updatedPlayer);
    setPlayers(
      ViewModel.sortPlayers([
        ...players.filter((p) => p.id !== player.id),
        updatedPlayer,
      ])
    );
  };

  return (
    <div className="container">
      <Sidebar
        settingsVisible={settingsVisible}
        setSettingsVisible={setSettingsVisible}
        pageSelected={pageSelected}
        setPageSelected={setPageSelected}
      />
      {pageSelected === 0 ? (
        <Table
          collapse={collapse}
          enlarge={enlarge}
          game={game}
          setGame={setGame}
          chooseMonstersVisible={chooseMonstersVisible}
          setChooseMonstersVisible={setChooseMonstersVisible}
          applyGlobalEffect={applyGlobalEffect}
          history={history}
          addHistoryRecord={addHistoryRecord}
          applyCureDamageToPlayers={applyCureDamageToPlayers}
          removePlayer={removePlayer}
          applyManualRoll={applyManualRoll}
          refreshPlayers={refreshPlayers}
          players={players}
          handleStatusDurationForPlayer={handleStatusDurationForPlayer}
        />
      ) : (
        <></>
      )}
      {pageSelected === 1 ? (
        <Party
          game={game}
          setGame={setGame}
          refreshPlayingCharacters={() => {
            setPlayers(ViewModel.getPlayersInitialState());
          }}
        />
      ) : (
        <></>
      )}
      {pageSelected === 2 ? (
        <Monsters refreshMonstersCategories={refreshMonstersCategories} />
      ) : (
        <></>
      )}
      {pageSelected === 3 ? <Grimoire /> : <></>}

      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">{t.message}</div>
        ))}
      </div>
      <Settings visible={settingsVisible} setVisible={setSettingsVisible} />
      <ChooseMonsters
        visible={chooseMonstersVisible}
        setVisible={setChooseMonstersVisible}
        monstersCategories={monstersCategories}
        handleSelection={handleSelection}
        handleQuantity={handleQuantity}
        handleManualRoll={handleManualRoll}
        addMonstersToGame={addMonstersToGame}
        refreshGame={refreshGame}
        resetCategories={refreshMonstersCategories}
      />
    </div>
  );
}

export default App;

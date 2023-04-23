import { useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Table from "./components/Table";
import Settings from "./components/dialogs/ModalSettings";
import ChooseMonsters from "./components/dialogs/ModalChooseMonsters";
import Party from "./components/Party";
import Monsters from "./components/Monsters";
import { Dao, History } from "./data/write";
import { Game } from "./types/Game";
import { ViewModel } from "./ViewModel";
import { Player } from "./types/GameTypes";

function App() {
  // ViewModel.reset();
  const [players, setPlayers] = useState(ViewModel.getPlayersInitialState()); //initial state
  const [pageSelected, setPageSelected] = useState(0);
  const [settingsVisible, setSettingsVisible] = useState(false);
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
      status: key === "status" ? value : playerToChange?.status,
      statusDuration:
        key === "statusDuration" ? value : playerToChange?.statusDuration,
      strength: playerToChange?.strength,
      type: playerToChange?.type,
      wisdom: playerToChange?.wisdom,
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
          handleStatusDuration={handleStatusDuration}
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

      <Settings visible={settingsVisible} setVisible={setSettingsVisible} />
      <ChooseMonsters
        visible={chooseMonstersVisible}
        setVisible={setChooseMonstersVisible}
        monstersCategories={monstersCategories}
        handleSelection={handleSelection}
        handleQuantity={handleQuantity}
        addMonstersToGame={addMonstersToGame}
        refreshGame={refreshGame}
      />
    </div>
  );
}

export default App;

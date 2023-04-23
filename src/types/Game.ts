export type Game = {
  turn: number;
  step: number;
  count: number;
  effectName: string;
  effectDuration: number;
};

export function increment(game: Game): Game {
  if (game.step + 1 === game.count) {
    game.step = 0;
    game.turn += 1;
  } else {
    game.step += 1;
  }

  if (game.effectDuration > 0) {
    game.effectDuration -= 1;
  }

  const result: Game = {
    turn: game.turn,
    step: game.step,
    count: game.count,
    effectName: game.effectName,
    effectDuration: game.effectDuration,
  };

  return result;
}
export function decrement(game: Game): Game {
  if (game.step - 1 === -1) {
    if (game.turn === 0) {
      game.step = 0;
    } else {
      game.step = game.count - 1;
      game.turn -= 1;
    }
  } else {
    game.step -= 1;
  }

  const result: Game = {
    turn: game.turn,
    step: game.step,
    count: game.count,
    effectName: game.effectName,
    effectDuration: game.effectDuration,
  };

  return result;
}

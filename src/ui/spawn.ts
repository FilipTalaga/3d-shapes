import { Game } from '../types';

export const spawnUI = (game: Game) => {
  game.ui = {
    debug: { open: false, lock: false },
  };
};

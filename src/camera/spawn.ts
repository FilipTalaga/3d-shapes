import { Game } from '../types';

export const spawnCamera = (game: Game) => {
  game.camera = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

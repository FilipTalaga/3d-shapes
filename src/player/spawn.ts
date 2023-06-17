import { config } from '../config';
import { Game } from '../types';

const {
  entities: { player },
  world,
} = config;

export const spawnPlayer = (game: Game) => {
  const width = player.size;
  const height = player.size;
  const x = world.width / 2 - width / 2;
  const y = world.height / 2 - height / 2;
  const color = player.color;
  const velocity = { x: 0, y: 0 };
  const standing = false;
  const direction = 1;
  const angle = 0;
  const jumpReady = false;
  const jumps = 0;

  game.entities.player = {
    width,
    height,
    position: {
      x,
      y,
    },
    color,
    velocity,
    standing,
    direction,
    angle,
    jumpReady,
    jumps,
  };
};

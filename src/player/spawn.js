import { config } from '../config.js';

const {
  entities: { player },
  world,
} = config;

export const spawnPlayer = game => {
  const width = player.size;
  const height = player.size;
  const x = world.width / 2 - width / 2;
  const y = world.height / 2 - height / 2;
  const color = player.color;
  const velocity = { x: 0, y: 0 };
  const direction = 1;
  const angle = 0;
  const jumpReady = false;
  const jumps = 0;

  game.entities.player = {
    width,
    height,
    x,
    y,
    color,
    velocity,
    direction,
    angle,
    jumpReady,
    jumps,
  };
};

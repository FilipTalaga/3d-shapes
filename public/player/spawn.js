import { config } from '../config.js';
import { getRandomInt, getRandomColor } from '../utils.js';

const { min, max, ratio } = config.player.size;

export const spawnPlayer = game => {
  const width = getRandomInt(min, max);
  const height = getRandomInt(width - width * ratio, width + width * ratio);
  const x = window.innerWidth / 2 - width / 2;
  const y = 0;
  const color = getRandomColor();
  const velocity = { x: 0, y: 0 };
  const direction = getRandomInt(0, 1) ? 1 : -1;

  game.entities.player = {
    width,
    height,
    x,
    y,
    color,
    velocity,
    direction,
  };
};

import { getRandomInt, getRandomColor } from './utils.js';
import { config } from './config.js';

export const getPlayer = () => {
  const { size } = config.player;

  const width = getRandomInt(size.min, size.max);
  const height = getRandomInt(width - width * size.ratio, width + width * size.ratio);

  return {
    x: window.innerWidth / 2 - width / 2,
    y: 0,
    width,
    height,
    color: getRandomColor(),
    velocity: {
      y: 0,
    },
  };
};

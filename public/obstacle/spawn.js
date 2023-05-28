import { config } from '../config.js';
import { getRandomInt, getRandomColor, getMultiple } from '../utils.js';

const { obstacle } = config;

const getObstacle = (index, count) => {
  const horizontalPadding = window.innerWidth * 0.1;
  const verticalOffset = window.innerHeight * (1 / (count * 2 + 1));
  const maxWidth = 500;
  const width = getRandomInt(
    Math.min(window.innerWidth * 0.1, maxWidth / 2),
    Math.min(window.innerWidth * 0.5, maxWidth),
  );
  const height = getRandomInt(obstacle.height.min, obstacle.height.max);
  const x = getRandomInt(horizontalPadding, window.innerWidth - width - horizontalPadding);
  const y = verticalOffset * (index * 2 + 1);
  const color = getRandomColor({ l: 0.9, s: 0.5 });

  return {
    x,
    y,
    width,
    height,
    color,
  };
};

export const spawnObstacles = game => {
  const count = getRandomInt(obstacle.count.min, obstacle.count.max);

  game.entities.obstacles = getMultiple(getObstacle, count);
};

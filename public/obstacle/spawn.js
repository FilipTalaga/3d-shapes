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

const getMapWalls = () => {
  const color = getRandomColor({ l: 0.1, s: 0.1 });
  const size = obstacle.wallSize;

  const top = { x: 0, y: 0, width: window.innerWidth, height: size };
  const left = { x: 0, y: 0, width: size, height: window.innerHeight };
  const right = { x: window.innerWidth - size, y: 0, width: size, height: window.innerHeight };
  const bottom = { x: 0, y: window.innerHeight - size, width: window.innerWidth, height: size };

  return [top, left, right, bottom].map(wall => ({ ...wall, color }));
};

export const spawnObstacles = game => {
  const count = getRandomInt(obstacle.count.min, obstacle.count.max);

  game.entities.obstacles = [...getMapWalls(), ...getMultiple(getObstacle, count)];
};

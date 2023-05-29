import { config } from '../config.js';
import { getRandomInt, getRandomColor, getMultiple } from '../utils.js';

const { obstacle, world } = config;

const getMapWalls = () => {
  const color = getRandomColor({ l: 0.3, s: 0 });
  const size = obstacle.wallSize;

  const { width, height } = world;

  const { innerWidth, innerHeight } = window;

  const left = {
    x: 0 - innerWidth,
    y: 0 - innerHeight,
    width: innerWidth + size,
    height: innerHeight * 2 + height,
  };

  const right = {
    x: width - size,
    y: 0 - innerHeight,
    width: innerWidth + size,
    height: innerHeight * 2 + height,
  };

  const top = {
    x: 0 - innerWidth,
    y: 0 - innerHeight,
    width: innerWidth * 2 + width,
    height: innerHeight + size,
  };

  const bottom = {
    x: 0 - innerWidth,
    y: height - size,
    width: innerWidth * 2 + width,
    height: innerHeight + size,
  };

  return [top, left, right, bottom].map(wall => ({ ...wall, color }));
};

const getObstacle = (rows, cols) => index => {
  const { width: innerWidth, height: innerHeight } = world;

  const mapWidth = innerWidth - obstacle.wallSize * 2;
  const mapHeight = innerHeight - obstacle.wallSize * 2;

  const cellWidth = mapWidth / cols;
  const cellHeight = mapHeight / rows;

  const row = Math.floor(index / cols);

  const width = getRandomInt(cellWidth * 0.2, cellWidth * 0.8);
  const height = getRandomInt(obstacle.height.min, obstacle.height.max);

  const cellX = obstacle.wallSize + ((cellWidth * index) % mapWidth);
  const cellY = obstacle.wallSize + cellHeight * row;

  const x = getRandomInt(cellX, cellX + cellWidth - width);
  const y = getRandomInt(cellY, cellY + cellHeight - height);

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
  const { width, height } = world;

  const proportion = width / height;
  const totalCells = count / proportion;
  const numRows = Math.sqrt(totalCells);
  const numColumns = numRows * proportion;

  const rows = Math.round(numRows);
  const cols = Math.round(numColumns);

  game.entities.obstacles = [
    ...getMapWalls(),
    ...getMultiple(getObstacle(rows, cols), rows * cols),
  ];
};

import { config } from '../config.js';
import { getRandomInt, getRandomColor, getMultiple } from '../utils.js';

const { obstacles, world } = config;

const getMapWalls = () => {
  const color = obstacles.walls.color;
  const size = obstacles.walls.size;

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

const getObstacle = (rows, cols, hue) => index => {
  const { width: innerWidth, height: innerHeight } = world;
  const { walls, platforms } = obstacles;

  const [top, right, bottom, left] = platforms.padding;

  const mapWidth = innerWidth - walls.size * 2 - right - left;
  const mapHeight = innerHeight - walls.size * 2 - top - bottom;

  const cellWidth = mapWidth / cols;
  const cellHeight = mapHeight / rows;

  const row = Math.floor(index / cols);

  const width = getRandomInt(cellWidth * 0.2, cellWidth * 0.8);
  const height = getRandomInt(platforms.height.min, platforms.height.max);

  const cellX = left + walls.size + ((cellWidth * index) % mapWidth);
  const cellY = top + walls.size + cellHeight * row;

  const x = getRandomInt(cellX, cellX + cellWidth - width);
  const y = getRandomInt(cellY, cellY + cellHeight - height);

  const color = `hsl(${hue}, 70%, 50%)`;

  return {
    x,
    y,
    width,
    height,
    color,
  };
};

export const spawnObstacles = game => {
  const { platforms } = obstacles;
  const { width, height } = world;

  const count = getRandomInt(platforms.count.min, platforms.count.max);

  const proportion = width / height;
  const totalCells = count / proportion;
  const numRows = Math.sqrt(totalCells);
  const numColumns = numRows * proportion;

  const rows = Math.round(numRows);
  const cols = Math.round(numColumns);

  /* Background's complementary color */
  const hue = (game.background.hue + 180) % 360;

  game.entities.obstacles = [
    ...getMapWalls(),
    ...getMultiple(getObstacle(rows, cols, hue), rows * cols),
  ];
};

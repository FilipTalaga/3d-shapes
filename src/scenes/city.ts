import { config } from '../config';
import { spawnNpcs } from '../npc/spawn';
import { createObstacle } from '../obstacle';
import { getRandomInt, getMultiple } from '../utils';

const { obstacles, world } = config;

const getMapWalls = () => {
  const color = obstacles.walls.color;
  const size = obstacles.walls.size;

  const { width, height } = world;
  const { innerWidth, innerHeight } = window;

  const left = {
    position: {
      x: 0 - innerWidth,
      y: 0 - innerHeight,
    },
    width: innerWidth + size,
    height: innerHeight * 2 + height,
  };

  const right = {
    position: {
      x: width - size,
      y: 0 - innerHeight,
    },
    width: innerWidth + size,
    height: innerHeight * 2 + height,
  };

  const top = {
    position: {
      x: 0 - innerWidth,
      y: 0 - innerHeight,
    },
    width: innerWidth * 2 + width,
    height: innerHeight + size,
  };

  const bottom = {
    position: {
      x: 0 - innerWidth,
      y: height - size,
    },
    width: innerWidth * 2 + width,
    height: innerHeight + size,
  };

  return [top, left, right, bottom].map(wall => createObstacle({ ...wall, color }));
};

const getObstacle = (rows: number, cols: number, hue: number) => (index: number) => {
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

  return createObstacle({
    position: {
      x,
      y,
    },
    width,
    height,
    color,
  });
};

export const spawnObstacles = (gameHue: number) => {
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
  const hue = (gameHue + 180) % 360;

  return [...getMapWalls(), ...getMultiple(getObstacle(rows, cols, hue), rows * cols)];
};

export const makeCity = () => {
  // const player = makePlayer()
  // const camera = makeCamera()
  // const background = makeBackground()
  // const npcs = makeNpcs()

  const spawn = () => {
    const hue = getRandomInt(0, 360);

    const obstacles = spawnObstacles(hue);
    const npcs = spawnNpcs(hue);

    return [...obstacles, ...npcs];
  };

  return { spawn };
};

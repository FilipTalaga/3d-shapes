import { getRandomInt, getRandomColor, getMultiple } from '../utils.js';
import { config } from '../config.js';

const {
  world,
  entities: {
    npcs: { size, count, velocity },
  },
} = config;

const getNpc = () => {
  const width = getRandomInt(size.min, size.max);
  const height = getRandomInt(width - width * size.ratio, width + width * size.ratio);

  return {
    x: world.width / 2 - width / 2,
    y: world.height / 2 - height / 2,
    width,
    height,
    color: getRandomColor({ l: 0.6 }),
    velocity: {
      x: getRandomInt(velocity.x.min, velocity.x.max),
      y: getRandomInt(velocity.y.min, velocity.y.max),
    },
    direction: getRandomInt(0, 1) ? 1 : -1,
  };
};

export const spawnNpcs = game => {
  const total = getRandomInt(count.min, count.max);

  game.entities.npcs = getMultiple(getNpc, total);
};

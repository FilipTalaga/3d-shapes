import { getRandomInt, getRandomColor } from './utils.js';
import { config } from './config.js';

export const getPlayer = () => {
  const { size } = config.player;

  const width = getRandomInt(size.min, size.max);
  const height = getRandomInt(width - width * size.ratio, width + width * size.ratio);

  return {
    x: window.innerWidth / 2 - width / 2,
    y: 0 - window.innerHeight,
    width,
    height,
    color: getRandomColor(),
    velocity: { y: 0 },
  };
};

export const getEntities = () => {
  const { count, size } = config.entity;

  const getEntity = () => {
    const width = getRandomInt(size.min, size.max);
    const height = getRandomInt(width - width * size.ratio, width + width * size.ratio);

    return {
      x: getRandomInt(0, window.innerWidth - width),
      y: getRandomInt(-200, 200),
      width,
      height,
      color: getRandomColor({ l: 0.7 }),
      velocity: { y: 0 },
    };
  };

  return new Array(getRandomInt(count.min, count.max)).fill().map(getEntity);
};

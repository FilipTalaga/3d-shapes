import { getRandomInt, getRandomColor } from './utils.js';
import { config } from './config.js';

export const getPlayer = () => {
  const {
    player: { size },
    simulation: { velocity },
  } = config;

  const width = getRandomInt(size.min, size.max);
  const height = getRandomInt(width - width * size.ratio, width + width * size.ratio);

  return {
    x: window.innerWidth / 2 - width / 2,
    y: window.innerHeight / 2 - height / 2,
    width,
    height,
    color: getRandomColor(),
    velocity: {
      x: getRandomInt(velocity.x.min, velocity.x.max),
      y: getRandomInt(velocity.y.min, velocity.y.max),
    },
    direction: getRandomInt(0, 1) ? 1 : -1,
  };
};

export const getNpcs = () => {
  const {
    entity: { count, size },
    simulation: { velocity },
  } = config;

  const getNpc = () => {
    const width = getRandomInt(size.min, size.max);
    const height = getRandomInt(width - width * size.ratio, width + width * size.ratio);

    return {
      x: window.innerWidth / 2 - width / 2,
      y: window.innerHeight / 2 - height / 2,
      width,
      height,
      color: getRandomColor({ l: 0.7 }),
      velocity: {
        x: getRandomInt(velocity.x.min, velocity.x.max),
        y: getRandomInt(velocity.y.min, velocity.y.max),
      },
      direction: getRandomInt(0, 1) ? 1 : -1,
    };
  };

  return new Array(getRandomInt(count.min, count.max)).fill().map(getNpc);
};

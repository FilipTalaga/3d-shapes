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
    type: 'player',
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
      type: 'npc',
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

export const getObstacles = () => {
  const { obstacle } = config;

  const count = getRandomInt(obstacle.count.min, obstacle.count.max);
  const horizontalPadding = window.innerWidth * 0.1;
  const verticalOffset = window.innerHeight * (1 / (count * 2 + 1));

  return new Array(count).fill().map((_, i) => {
    const maxWidth = 500;
    const width = getRandomInt(
      Math.min(window.innerWidth * 0.1, maxWidth / 2),
      Math.min(window.innerWidth * 0.5, maxWidth),
    );
    const height = getRandomInt(obstacle.height.min, obstacle.height.max);

    return {
      type: 'obstacle',
      x: getRandomInt(horizontalPadding, window.innerWidth - width - horizontalPadding),
      y: verticalOffset * (i * 2 + 1),
      width,
      height,
      color: getRandomColor({ l: 0.9, s: 0.5 }),
    };
  });
};

import { config } from '../config.js';
import { getMultiple } from '../utils.js';

const {
  world: { width, height },
  environment: {
    background: { rows, light },
  },
} = config;

export const spawnBackground = game => {
  const rowHeight = height / rows;
  const offset = (light.max - light.min) / (rows - 1);

  game.background = getMultiple(
    index => ({
      x: 0,
      y: index * rowHeight,
      width,
      height: rowHeight,
      color: `hsl(0, 0%, ${light.max - index * offset}%)`,
    }),
    rows,
  );
};

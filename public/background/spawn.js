import { config } from '../config.js';
import { getMultiple, getRandomInt } from '../utils.js';

const {
  entities: { player },
  world: { width, height },
  environment: {
    background: { rows, cols, light },
  },
} = config;

export const spawnBackground = game => {
  const rowsCount = rows + 1;
  const colsCount = Math.ceil(width / cols.width);
  const rowHeight = height / rowsCount;
  const lightOffset = (light.max - light.min) / (rowsCount - 1);
  const parallaxRate = 1 / (rowsCount - 1);

  game.background = {
    rowsCount,
    colsCount,
    rowHeight,
    lightOffset,
    parallaxRate,
    layers: getMultiple(rowIndex => {
      const parallax = 1 - rowIndex * parallaxRate;
      const color = `hsl(0, 10%, ${light.max - rowIndex * lightOffset}%)`;

      /* Background */
      if (rowIndex === 0) {
        return {
          x: 0,
          y: 0,
          width,
          height: height - player.size + height * parallax,
          color,
          parallax,
        };
      }

      /* Layers */
      return {
        x: 0,
        y: 0,
        width,
        height,
        parallax,
        columns: getMultiple(colIndex => {
          const heightOffset = getRandomInt(-rowHeight * cols.ratio, rowHeight * cols.ratio);

          /* Mitigates micro cracks between columns */
          const overMargin = 1;

          return {
            x: colIndex * cols.width - overMargin,
            y: rowIndex * rowHeight + heightOffset,
            width: cols.width + overMargin * 2,
            height: height - rowIndex * rowHeight - heightOffset,
            color,
          };
        }, colsCount),
      };
    }, rowsCount),
  };
};

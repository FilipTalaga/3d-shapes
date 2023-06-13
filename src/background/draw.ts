import { Game } from '../types';

export const drawBackground = ({ ctx, background: { layers }, draw }: Game) => {
  layers.forEach((row, index) => {
    if (index === 0) {
      ctx.fillStyle = row.color!;
      draw(row.x, row.y, row.width, row.height);
      return;
    }

    row.columns.forEach(({ x, y, width, height }) => {
      ctx.fillStyle = row.color;
      draw(row.x + x, row.y + y, width, height);
    });
  });
};

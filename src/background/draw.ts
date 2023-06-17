import { Game } from '../types';

export const drawBackground = ({ ctx, background: { layers }, draw }: Game) => {
  layers.forEach((row, index) => {
    if (index === 0) {
      ctx.fillStyle = row.color!;
      draw(row.position.x, row.position.y, row.width, row.height);
      return;
    }

    row.columns.forEach(({ position: { x, y }, width, height }) => {
      ctx.fillStyle = row.color;
      draw(row.position.x + x, row.position.y + y, width, height);
    });
  });
};

import { Game } from '../types';

export const drawObstacles = ({ ctx, entities: { obstacles }, draw }: Game) =>
  obstacles.forEach(({ color, x, y, width, height }) => {
    ctx.fillStyle = color;
    draw(x, y, width, height);
  });

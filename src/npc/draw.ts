import { Game } from '../types';

export const drawNpcs = ({ ctx, entities: { npcs }, draw }: Game) =>
  npcs.forEach(({ color, position: { x, y }, width, height }) => {
    ctx.fillStyle = color;
    draw(x, y, width, height);
  });

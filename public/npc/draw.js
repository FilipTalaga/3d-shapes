export const drawNpcs = ({ ctx, entities: { npcs }, draw }) =>
  npcs.forEach(({ color, x, y, width, height }) => {
    ctx.fillStyle = color;
    draw(x, y, width, height);
  });

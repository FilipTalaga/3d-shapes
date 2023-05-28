export const drawNpcs = ({ ctx, entities: { npcs } }) =>
  npcs.forEach(({ color, x, y, width, height }) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  });

export const drawObstacles = ({ ctx, entities: { obstacles } }) =>
  obstacles.forEach(({ color, x, y, width, height }) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  });

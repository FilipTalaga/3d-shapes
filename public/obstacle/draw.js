export const drawObstacles = ({ ctx, entities: { obstacles }, draw }) =>
  obstacles.forEach(({ color, x, y, width, height }) => {
    ctx.fillStyle = color;
    draw(x, y, width, height);
  });

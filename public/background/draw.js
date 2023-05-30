export const drawBackground = ({ ctx, background, draw }) => {
  background.forEach(({ x, y, width, height, color }) => {
    ctx.fillStyle = color;
    draw(x, y, width, height);
  });
};

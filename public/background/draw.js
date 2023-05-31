export const drawBackground = ({ ctx, background, draw }) => {
  background.layers.forEach((row, index) => {
    if (index === 0) {
      ctx.fillStyle = row.color;
      draw(row.x, row.y, row.width, row.height);
      return;
    }

    row.columns.forEach(({ x, y, width, height, color }) => {
      ctx.fillStyle = color;
      draw(row.x + x, row.y + y, width, height);
    });
  });
};

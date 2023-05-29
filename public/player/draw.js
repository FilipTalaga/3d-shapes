export const drawPlayer = ({
  ctx,
  entities: {
    player: { color, x, y, width, height },
  },
  draw,
}) => {
  ctx.fillStyle = color;
  draw(x, y, width, height);
};

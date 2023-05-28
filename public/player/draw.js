export const drawPlayer = ({
  ctx,
  entities: {
    player: { color, x, y, width, height },
  },
}) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

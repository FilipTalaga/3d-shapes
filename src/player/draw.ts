import { Game } from '../types';

export const drawPlayer = ({
  ctx,
  camera,
  entities: {
    player: { color, x, y, width, height, angle },
  },
}: Game) => {
  const origin = { x: width / 2, y: height / 2 };

  ctx.save();

  ctx.translate(x + origin.x - camera.x, y + origin.y - camera.y);
  ctx.rotate(angle * (Math.PI / 180));

  ctx.fillStyle = color;
  ctx.fillRect(0 - origin.x, 0 - origin.y, width, height);

  ctx.restore();
};

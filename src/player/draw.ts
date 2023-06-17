import { Game } from '../types';

export const drawPlayer = ({
  ctx,
  camera,
  entities: {
    player: {
      color,
      position: { x, y },
      width,
      height,
      angle,
    },
  },
}: Game) => {
  const origin = { x: width / 2, y: height / 2 };

  ctx.save();

  ctx.translate(x + origin.x - camera.position.x, y + origin.y - camera.position.y);
  ctx.rotate(angle * (Math.PI / 180));

  ctx.fillStyle = color;
  ctx.fillRect(0 - origin.x, 0 - origin.y, width, height);

  ctx.restore();
};

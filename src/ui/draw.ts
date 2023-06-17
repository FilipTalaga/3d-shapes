import { Game } from '../types';

export const drawUI = ({
  ctx,
  camera,
  ui: { debug },
  entities: {
    player: {
      position: { x, y },
      width,
      height,
      jumps,
      jumpReady,
      velocity,
      direction,
      angle,
    },
  },
}: Game) => {
  if (!debug.open) return;

  const origin = { x: x - camera.position.x + width / 2, y: y - camera.position.y + height / 2 };

  /* Player jump state */
  if (jumpReady && jumps > 0) {
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, width, 0, 2 * Math.PI);
    ctx.fillStyle = 'hsl(60, 100%, 50%, 50%)';
    ctx.fill();
    ctx.closePath();
  }

  /* Player jump count */
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '30px Arial';
  ctx.fillText(jumps.toString(), origin.x, origin.y + 4);

  /* Player stats */
  const drawInfo = (texts: string[]) => {
    const marginLeft = 100;
    const fontSize = 30;
    const p = 20;
    const lineHeight = 1.5;
    const textHeight = fontSize * lineHeight;
    const height = texts.length * textHeight - (textHeight - fontSize) + p * 2;
    const width = 300;

    ctx.fillStyle = 'hsl(0, 0%, 0%, 50%)';
    ctx.fillRect(marginLeft + origin.x, origin.y - height / 2, width, height);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = `${fontSize}px Arial`;

    texts.forEach((element, index) => {
      ctx.fillText(
        element,
        marginLeft + origin.x + p,
        origin.y - height / 2 + p + textHeight * index,
      );
    });
  };

  drawInfo([
    `Velocity X: ${(velocity.x * direction).toFixed(0)}`,
    `Velocity Y: ${velocity.y.toFixed(0)}`,
    `Angle: ${angle.toFixed(0)}`,
  ]);
};

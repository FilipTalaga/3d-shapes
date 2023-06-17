import { config } from '../config';
import { Entity, GameObject, Player } from '../types';

export const makeGraphics = () => {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;
  const { position } = config.camera;
  const camera = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const resize = () => {
    const { devicePixelRatio, innerWidth, innerHeight } = window;

    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  const draw = ({ position: { x, y }, width, height, color }: Entity) => {
    if (color) {
      ctx.fillStyle = color;
    }
    ctx.fillRect(x - camera.x, y - camera.y, width, height);
  };

  const clear = () => ctx.clearRect(0, 0, camera.width, camera.height);

  // const moveCamera = (player: Player) => {
  //   camera.y = player.y + player.height * 0.5 - camera.height * position.y;
  //   camera.x = player.x + player.width * 0.5 - camera.width * position.x;
  // };

  return { resize, draw, clear };
  // return { resize, draw, clear, moveCamera };
};

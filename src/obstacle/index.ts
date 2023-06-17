import { GameObject, Obstacle } from '../types';

export const createObstacle = ({
  position: { x, y },
  width,
  height,
  color,
}: Obstacle): GameObject => {
  const rigidBody = { x, y, width, height };

  const render = (graphics: any) => {
    graphics.draw(rigidBody.x, rigidBody.y, rigidBody.width, rigidBody.height, color);
  };

  return { render };
};

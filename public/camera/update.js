import { config } from '../config.js';

const { world } = config;

export const moveCamera = game => {
  const {
    camera,
    entities: { player },
  } = game;

  /*********************************************************/
  /* Move vertically                                       */
  /*********************************************************/
  camera.y = player.y + player.height / 2 - camera.height / 2;

  const collidesTop = camera.y < 0;
  const collidesBottom = camera.y + camera.height > world.height;

  if (collidesTop || collidesBottom) {
    camera.y = collidesTop ? 0 : world.height - camera.height;
  }

  /*********************************************************/
  /* Move horizontally                                     */
  /*********************************************************/
  camera.x = player.x + player.width / 2 - camera.width / 2;

  const collidesLeft = camera.x < 0;
  const collidesRight = camera.x + camera.width > world.width;

  if (collidesLeft || collidesRight) {
    camera.x = collidesLeft ? 0 : world.width - camera.width;
  }
};

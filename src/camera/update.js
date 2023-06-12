import { config } from '../config.js';

const { position } = config.camera;

export const moveCamera = game => {
  const {
    camera,
    entities: { player },
  } = game;

  /*********************************************************/
  /* Move vertically                                       */
  /*********************************************************/

  const targetY = player.y + player.height * 0.5 - camera.height * position.y;
  camera.y = targetY;

  /*********************************************************/
  /* Move horizontally                                     */
  /*********************************************************/

  const targetX = player.x + player.width * 0.5 - camera.width * position.x;
  camera.x = targetX;
};

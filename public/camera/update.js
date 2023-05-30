export const moveCamera = game => {
  const {
    camera,
    entities: { player },
  } = game;

  /*********************************************************/
  /* Move vertically                                       */
  /*********************************************************/

  const targetY = player.y + player.height * 0.5 - camera.height * 0.6;
  camera.y = targetY;

  /*********************************************************/
  /* Move horizontally                                     */
  /*********************************************************/

  const targetX = player.x + player.width * 0.5 - camera.width * 0.5;
  camera.x = targetX;
};

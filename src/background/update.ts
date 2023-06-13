import { Game } from '../types';

export const moveBackground = (game: Game) => {
  const {
    background: { layers },
    entities: { player },
  } = game;

  const playerCenterY = player.y + player.height / 2;
  const playerCenterX = player.x + player.width / 2;

  layers.forEach(row => {
    /*********************************************************/
    /* Move vertically                                       */
    /*********************************************************/
    const targetY = playerCenterY - row.height / 2;
    row.y = targetY * row.parallax;

    /*********************************************************/
    /* Move horizontally                                     */
    /*********************************************************/

    const targetX = playerCenterX - row.width / 2;
    row.x = targetX * row.parallax;
  });
};

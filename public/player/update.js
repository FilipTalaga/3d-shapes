import { config } from '../config.js';
import { collides, xor } from '../utils.js';

const {
  player: { jump },
  world: { gravity },
} = config;

export const movePlayer = game => {
  const {
    deltaTime,
    entities: { player, obstacles },
    controller: { controlsPressed },
  } = game;

  /*********************************************************/
  /* Apply gravity                                         */
  /*********************************************************/
  player.velocity.y += gravity * deltaTime;

  /*********************************************************/
  /* Move vertically                                       */
  /*********************************************************/
  player.y += player.velocity.y * deltaTime;

  /*********************************************************/
  /* Check obstacle collision                              */
  /*********************************************************/
  obstacles
    .filter(obstacle => collides(player, obstacle))
    .forEach(obstacle => {
      const collidesFromTop = player.y + player.height > obstacle.y && player.y < obstacle.y;

      player.y = collidesFromTop
        ? obstacle.y - player.height /* Collision from top */
        : obstacle.y + obstacle.height; /* Collision from bottom */

      player.velocity.y = 0; /* Reset velocity on hit */

      if (collidesFromTop && controlsPressed.Space) {
        player.velocity.y = -jump; /* Jump */
      }
    });

  /*********************************************************/
  /* Apply controlled movement                             */
  /*********************************************************/
  if (xor(controlsPressed.ArrowLeft, controlsPressed.ArrowRight)) {
    player.direction = controlsPressed.ArrowLeft ? -1 : 1;
    player.velocity.x = config.player.speed;
  } else {
    player.velocity.x = 0;
  }

  /*********************************************************/
  /* Move horizontally                                     */
  /*********************************************************/
  player.x += player.velocity.x * player.direction * deltaTime;

  /*********************************************************/
  /* Check obstacle collision                              */
  /*********************************************************/
  obstacles
    .filter(obstacle => collides(player, obstacle))
    .forEach(obstacle => {
      /* Align position with the obstacle boundries */
      player.x =
        player.x + player.width > obstacle.x && player.x < obstacle.x
          ? obstacle.x - player.width /* Collision from left */
          : obstacle.x + obstacle.width; /* Collision from right */
    });
};

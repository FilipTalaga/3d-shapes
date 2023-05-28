import { config } from '../config.js';
import { collides } from '../utils.js';

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

  const applyGravity = () => (player.velocity.y += gravity * deltaTime);

  const applyJump = () => (player.velocity.y = -jump);

  const bounceVertically = () => (player.velocity.y = 0);

  const moveVertically = () => {
    /*********************************************************/
    /* Move vertically                                       */
    /*********************************************************/
    applyGravity();
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

        bounceVertically();

        if (collidesFromTop && controlsPressed.Space) {
          applyJump();
        }
      });

    /*********************************************************/
    /* Check ground and ceiling collision                    */
    /*********************************************************/
    const collidesTop = player.y <= 0;
    const collidesBottom = player.y + player.height >= window.innerHeight;

    if (collidesTop || collidesBottom) {
      /* Align with ground if went over */
      player.y = collidesTop ? 0 : window.innerHeight - player.height;

      bounceVertically();
    }

    if (collidesBottom && controlsPressed.Space) {
      applyJump();
    }
  };

  const moveHorizontally = () => {
    /*********************************************************/
    /* Move horizontally                                     */
    /*********************************************************/

    if (controlsPressed.ArrowLeft && controlsPressed.ArrowRight) {
      player.velocity.x = 0;
    } else if (controlsPressed.ArrowLeft) {
      player.direction = -1;
      player.velocity.x = config.player.speed;
    } else if (controlsPressed.ArrowRight) {
      player.direction = 1;
      player.velocity.x = config.player.speed;
    } else {
      player.velocity.x = 0;
    }

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

    /*********************************************************/
    /* Check wall collision                                  */
    /*********************************************************/
    const collidesLeft = player.x <= 0;
    const collidesRight = player.x + player.width >= window.innerWidth;

    if (collidesLeft || collidesRight) {
      /* Align with wall if went over */
      player.x = collidesLeft ? 0 : window.innerWidth - player.width;
    }
  };

  moveVertically();
  moveHorizontally();
};

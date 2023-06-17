import { config } from '../config';
import { Game } from '../types';
import { collides, xor } from '../utils';

const {
  entities: {
    player: { jump, speed, accelerationTime, rotation, maxJumps },
  },
  world: { gravity, maxVelocity },
} = config;

export const movePlayer = (game: Game) => {
  const {
    deltaTime,
    entities: { player, obstacles },
    controller: { controlsPressed },
  } = game;

  /*********************************************************/
  /* Apply gravity                                         */
  /*********************************************************/
  player.velocity.y = Math.min(player.velocity.y + gravity * deltaTime, maxVelocity);

  /*********************************************************/
  /* Move vertically                                       */
  /*********************************************************/
  player.position.y += player.velocity.y * deltaTime;

  /*********************************************************/
  /* Check obstacle collision                              */
  /*********************************************************/
  player.standing = false;
  obstacles
    .filter(obstacle => collides(player, obstacle))
    .forEach(obstacle => {
      player.standing =
        player.position.y + player.height > obstacle.position.y &&
        player.position.y < obstacle.position.y;

      player.position.y = player.standing
        ? obstacle.position.y - player.height /* Collision from top */
        : obstacle.position.y + obstacle.height; /* Collision from bottom */

      player.velocity.y = 0; /* Reset velocity on hit */
    });

  /*********************************************************/
  /* Handle jump                                           */
  /*********************************************************/

  /* Toggle jump key */
  if (!controlsPressed.Space) {
    player.jumpReady = true;

    /* Reset jump count on the ground */
    player.jumps = player.standing ? maxJumps : player.jumps;
  }

  /* Take one jump away after fall */
  if (!player.standing && player.jumps >= maxJumps) {
    player.jumps = maxJumps - 1;
  }

  /* Jump until any jumps left */
  if (player.jumpReady && controlsPressed.Space && player.jumps > 0) {
    player.velocity.y = -jump; /* Jump */
    player.jumpReady = false;
    player.jumps -= 1;
  }

  /*********************************************************/
  /* Apply rotation                                        */
  /*********************************************************/

  if (!player.standing) {
    /* Rotate in the air */
    player.angle += rotation.air * player.direction * (player.velocity.x / speed) * deltaTime;

    /* Keep the angle in 0-90 range */
    if (player.angle < 0) {
      player.angle += 90;
    } else if (player.angle > 90) {
      player.angle -= 90;
    }
  } else if (player.angle !== 0) {
    /* Align with the ground */
    player.angle += rotation.ground * (player.angle > 45 ? 1 : -1) * deltaTime;

    /* Reset the angle if aligned with the ground */
    if (player.angle < 0 || player.angle > 90) {
      player.angle = 0;
    }
  }

  /*********************************************************/
  /* Apply controlled movement                             */
  /*********************************************************/
  const acceleration = speed * deltaTime * (1 / accelerationTime);

  if (xor(controlsPressed.ArrowLeft, controlsPressed.ArrowRight)) {
    const newDirection = controlsPressed.ArrowLeft ? -1 : 1;
    if (player.direction !== newDirection) {
      player.velocity.x = 0;
    }
    player.direction = newDirection;
    player.velocity.x = Math.min(player.velocity.x + acceleration, speed);
  } else {
    player.velocity.x = Math.max(player.velocity.x - acceleration, 0);
  }

  /*********************************************************/
  /* Move horizontally                                     */
  /*********************************************************/
  player.position.x += player.velocity.x * player.direction * deltaTime;

  /*********************************************************/
  /* Check obstacle collision                              */
  /*********************************************************/
  obstacles
    .filter(obstacle => collides(player, obstacle))
    .forEach(obstacle => {
      /* Align position with the obstacle boundries */
      player.position.x =
        player.position.x + player.width > obstacle.position.x &&
        player.position.x < obstacle.position.x
          ? obstacle.position.x - player.width /* Collision from left */
          : obstacle.position.x + obstacle.width; /* Collision from right */
    });
};

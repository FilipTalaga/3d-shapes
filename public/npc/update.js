import { config } from '../config.js';
import { collides } from '../utils.js';

const {
  world: { gravity, friction, bounce, airResistance },
  entity: { playerBounce },
} = config;

const moveNpc = game => entity => {
  const {
    deltaTime,
    entities: { obstacles, player },
  } = game;

  /*********************************************************/
  /* Apply gravity                                         */
  /*********************************************************/
  entity.velocity.y += gravity * deltaTime;

  /*********************************************************/
  /* Move vertically                                       */
  /*********************************************************/
  entity.y += entity.velocity.y * deltaTime;

  /*********************************************************/
  /* Check obstacle collision                              */
  /*********************************************************/
  obstacles
    .filter(obstacle => collides(entity, obstacle))
    .forEach(obstacle => {
      const collidesFromTop = entity.y + entity.height > obstacle.y && entity.y < obstacle.y;

      entity.y = collidesFromTop
        ? obstacle.y - entity.height /* Collision from top */
        : obstacle.y + obstacle.height; /* Collision from bottom */

      /* Bounce */
      entity.velocity.y *= -bounce;

      /* Apply friction */
      entity.velocity.x = Math.max(entity.velocity.x - friction * deltaTime, 0);
    });

  /*********************************************************/
  /* Apply Air Resistance                                  */
  /*********************************************************/
  entity.velocity.x = Math.max(entity.velocity.x - airResistance * deltaTime, 0);

  /*********************************************************/
  /* Move horizontally                                     */
  /*********************************************************/
  entity.x += entity.velocity.x * entity.direction * deltaTime;

  /*********************************************************/
  /* Check obstacle collision                              */
  /*********************************************************/
  obstacles
    .filter(obstacle => collides(entity, obstacle))
    .forEach(obstacle => {
      /* Align position with the obstacle boundries */
      entity.x =
        entity.x + entity.width > obstacle.x && entity.x < obstacle.x
          ? obstacle.x - entity.width /* Collision from left */
          : obstacle.x + obstacle.width; /* Collision from right */

      /* Bounce */
      entity.direction *= -bounce;

      /* Apply friction */
      entity.velocity.x = Math.max(entity.velocity.x - friction * deltaTime, 0);
    });

  /*********************************************************/
  /* Check player collision                              */
  /*********************************************************/
  if (collides(entity, player)) {
    /* Align position with the player boundries */
    entity.x =
      entity.x + entity.width > player.x && entity.x < player.x
        ? player.x - entity.width /* Collision from left */
        : player.x + player.width; /* Collision from right */

    /* Avoid player */
    entity.velocity.x = entity.velocity.x > playerBounce ? entity.velocity.x : playerBounce;
    entity.direction *= -1;
  }
};

export const moveNpcs = game => game.entities.npcs.forEach(moveNpc(game));

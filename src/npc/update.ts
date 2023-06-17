import { config } from '../config';
import { Entity, Game, Npc } from '../types';
import { collides } from '../utils';

const {
  world: { gravity },
  entities: {
    npcs: { playerBounce, friction, bounce, airResistance },
  },
} = config;

const moveNpc = (game: Game) => (entity: Npc) => {
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
  entity.position.y += entity.velocity.y * deltaTime;

  /*********************************************************/
  /* Check obstacle collision                              */
  /*********************************************************/
  obstacles
    .filter(obstacle => collides(entity, obstacle))
    .forEach(obstacle => {
      const collidesFromTop =
        entity.position.y + entity.height > obstacle.position.y &&
        entity.position.y < obstacle.position.y;

      entity.position.y = collidesFromTop
        ? obstacle.position.y - entity.height /* Collision from top */
        : obstacle.position.y + obstacle.height; /* Collision from bottom */

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
  entity.position.x += entity.velocity.x * entity.direction * deltaTime;

  /*********************************************************/
  /* Check obstacle collision                              */
  /*********************************************************/
  obstacles
    .filter(obstacle => collides(entity, obstacle))
    .forEach(obstacle => {
      /* Align position with the obstacle boundries */
      entity.position.x =
        entity.position.x + entity.width > obstacle.position.x &&
        entity.position.x < obstacle.position.x
          ? obstacle.position.x - entity.width /* Collision from left */
          : obstacle.position.x + obstacle.width; /* Collision from right */

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
    entity.position.x =
      entity.position.x + entity.width > player.position.x && entity.position.x < player.position.x
        ? player.position.x - entity.width /* Collision from left */
        : player.position.x + player.width; /* Collision from right */

    /* Avoid player */
    entity.velocity.x = entity.velocity.x > playerBounce ? entity.velocity.x : playerBounce;
    entity.direction *= -1;
  }
};

export const moveNpcs = (game: Game) => game.entities.npcs.forEach(moveNpc(game));

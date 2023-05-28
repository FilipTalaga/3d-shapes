import { config } from '../config.js';
import { collides } from '../utils.js';

const { gravity, friction, bounce, airResistance } = config.world;

const moveNpc = game => entity => {
  const {
    deltaTime,
    entities: { obstacles },
  } = game;

  const applyGravity = entity => (entity.velocity.y += gravity * deltaTime);

  const applyFricion = entity => {
    entity.velocity.x = Math.max(entity.velocity.x - friction * deltaTime, 0);
  };

  const applyAirResistance = entity => {
    entity.velocity.x = Math.max(entity.velocity.x - airResistance * deltaTime, 0);
  };

  const bounceHorizontally = entity => (entity.direction *= -bounce);

  const bounceVertically = entity => (entity.velocity.y *= -bounce);

  const moveVertically = () => {
    /*********************************************************/
    /* Move vertically                                       */
    /*********************************************************/
    applyGravity(entity);
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

        bounceVertically(entity);
        applyFricion(entity);
      });

    /*********************************************************/
    /* Check ground and ceiling collision                    */
    /*********************************************************/
    const collidesTop = entity.y <= 0;
    const collidesBottom = entity.y + entity.height >= window.innerHeight;

    if (collidesTop || collidesBottom) {
      /* Align with ground if went over */
      entity.y = collidesTop ? 0 : window.innerHeight - entity.height;

      bounceVertically(entity);
      applyFricion(entity);
    }
  };

  const moveHorizontally = () => {
    /*********************************************************/
    /* Move horizontally                                     */
    /*********************************************************/
    applyAirResistance(entity);
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

        bounceHorizontally(entity);
        applyFricion(entity);
      });

    /*********************************************************/
    /* Check wall collision                                  */
    /*********************************************************/
    const collidesLeft = entity.x <= 0;
    const collidesRight = entity.x + entity.width >= window.innerWidth;

    if (collidesLeft || collidesRight) {
      /* Align with wall if went over */
      entity.x = collidesLeft ? 0 : window.innerWidth - entity.width;

      bounceHorizontally(entity);
      applyFricion(entity);
    }
  };

  moveVertically();
  moveHorizontally();
};

export const moveNpcs = game => game.entities.npcs.forEach(moveNpc(game));

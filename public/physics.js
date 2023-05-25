import { config } from './config.js';

export const getPhysics = deltaTime => {
  const move = entity => {
    const { gravity, friction, bounce } = config.world;

    /* Apply gravity */
    entity.velocity.y += gravity * deltaTime;

    /* Move */
    entity.y += entity.velocity.y * deltaTime;
    entity.x += entity.velocity.x * entity.direction * deltaTime;

    /* Check ground collision*/
    const collidesTop = entity.y <= 0;
    const collidesBottom = entity.y + entity.height >= window.innerHeight;

    /* Check wall collision */
    const collidesLeft = entity.x <= 0;
    const collidesRight = entity.x + entity.width >= window.innerWidth;

    if (collidesTop || collidesBottom) {
      /* Align with ground if went over */
      entity.y = collidesTop ? 0 : window.innerHeight - entity.height;

      /* Change vertical direction to bounce */
      entity.velocity.y *= -bounce;
    }

    if (collidesLeft || collidesRight) {
      /* Align with wall if went over */
      entity.x = collidesLeft ? 0 : window.innerWidth - entity.width;

      /* Change horizontal direction to bounce */
      entity.direction *= -bounce;
    }

    if (collidesTop || collidesBottom || collidesLeft || collidesRight) {
      /* Apply friction */
      entity.velocity.x = entity.velocity.x <= 0 ? 0 : entity.velocity.x - friction * deltaTime;
    }
  };

  return { move };
};

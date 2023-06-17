import { GameObject, Npc } from '../types';
import { config } from '../config';

const {
  world: { gravity },
  entities: {
    npcs: { playerBounce, friction, bounce, airResistance },
  },
} = config;

export const createNpc = ({
  position: { x, y },
  width,
  height,
  color,
  velocity,
  direction,
}: Npc): GameObject => {
  const rigidBody = { x, y, width, height, velocity, direction };

  const render = (graphics: any) => {
    graphics.draw(rigidBody.x, rigidBody.y, rigidBody.width, rigidBody.height, color);
  };

  const update = (deltaTime: number) => {
    // const {
    //  entities: { obstacles, player },
    // } = game;

    /*********************************************************/
    /* Apply gravity                                         */
    /*********************************************************/
    rigidBody.velocity.y += gravity * deltaTime;

    /*********************************************************/
    /* Move vertically                                       */
    /*********************************************************/
    rigidBody.y += rigidBody.velocity.y * deltaTime;

    /*********************************************************/
    /* Check obstacle collision                              */
    /*********************************************************/
    // obstacles
    //   .filter(obstacle => collides(rigidBody, obstacle))
    //   .forEach(obstacle => {
    //     const collidesFromTop =
    //       rigidBody.y + rigidBody.height > obstacle.y && rigidBody.y < obstacle.y;

    //     rigidBody.y = collidesFromTop
    //       ? obstacle.y - rigidBody.height /* Collision from top */
    //       : obstacle.y + obstacle.height; /* Collision from bottom */

    //     /* Bounce */
    //     rigidBody.velocity.y *= -bounce;

    //     /* Apply friction */
    //     rigidBody.velocity.x = Math.max(rigidBody.velocity.x - friction * deltaTime, 0);
    //   });

    /*********************************************************/
    /* Apply Air Resistance                                  */
    /*********************************************************/
    rigidBody.velocity.x = Math.max(rigidBody.velocity.x - airResistance * deltaTime, 0);

    /*********************************************************/
    /* Move horizontally                                     */
    /*********************************************************/
    rigidBody.x += rigidBody.velocity.x * rigidBody.direction * deltaTime;

    /*********************************************************/
    /* Check obstacle collision                              */
    /*********************************************************/
    // obstacles
    //   .filter(obstacle => collides(rigidBody, obstacle))
    //   .forEach(obstacle => {
    //     /* Align position with the obstacle boundries */
    //     rigidBody.x =
    //       rigidBody.x + rigidBody.width > obstacle.x && rigidBody.x < obstacle.x
    //         ? obstacle.x - rigidBody.width /* Collision from left */
    //         : obstacle.x + obstacle.width; /* Collision from right */

    //     /* Bounce */
    //     rigidBody.direction *= -bounce;

    //     /* Apply friction */
    //     rigidBody.velocity.x = Math.max(rigidBody.velocity.x - friction * deltaTime, 0);
    //   });

    /*********************************************************/
    /* Check player collision                              */
    /*********************************************************/
    // if (collides(rigidBody, player)) {
    //   /* Align position with the player boundries */
    //   rigidBody.x =
    //     rigidBody.x + rigidBody.width > player.x && rigidBody.x < player.x
    //       ? player.x - rigidBody.width /* Collision from left */
    //       : player.x + player.width; /* Collision from right */

    //   /* Avoid player */
    //   rigidBody.velocity.x =
    //     rigidBody.velocity.x > playerBounce ? rigidBody.velocity.x : playerBounce;
    //   rigidBody.direction *= -1;
    // }
  };

  return { render, update };
};

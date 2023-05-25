import { gameLoop } from './engine.js';
import { config } from './config.js';
import { getPlayer, getEntities } from './entities.js';
import { getRenderer } from './renderer.js';

const player = getPlayer();

const entities = getEntities();

const { gravity, bounce } = config.world;

const fall = (entity, deltaTime) => {
  /* Apply gravity */
  entity.velocity.y += gravity * deltaTime;

  /* Move */
  entity.y += entity.velocity.y * deltaTime;

  /* Leave if in not on the ground */
  if (entity.y + entity.height < window.innerHeight) return;

  /* Align with ground if went over */
  entity.y = window.innerHeight - entity.height;

  /* Change direction to bounce */
  entity.velocity.y *= -bounce;
};

const update = deltaTime => {
  fall(player, deltaTime);
  entities.forEach(entity => fall(entity, deltaTime));
};

const render = ctx => {
  const { drawEntity } = getRenderer(ctx);

  entities.forEach(drawEntity);
  drawEntity(player);
};

const loop = gameLoop(update, render);

window.addEventListener('load', loop.start);

window.addEventListener('keydown', ({ code }) => {
  if (code === 'Space' && player.y === window.innerHeight - player.height) {
    player.velocity.y = gravity * bounce;
  }
});

window.addEventListener('unload', loop.stop);

import { gameLoop } from './engine.js';
import { config } from './config.js';
import { getPlayer } from './entities.js';
import { getRenderer } from './renderer.js';

const player = getPlayer();

const { gravity, bounce } = config.world;

const update = deltaTime => {
  /* Apply gravity */
  player.velocity.y += gravity * deltaTime;

  /* Move */
  player.y += player.velocity.y * deltaTime;

  /* Leave if in not on the ground */
  if (player.y + player.height < window.innerHeight) return;

  /* Align with ground if went over */
  player.y = window.innerHeight - player.height;

  /* Change direction to bounce */
  player.velocity.y *= -bounce;
};

const render = ctx => {
  const { drawEntity } = getRenderer(ctx);

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

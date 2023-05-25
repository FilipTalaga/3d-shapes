import { gameLoop } from './engine.js';
import { getPlayer, getNpcs } from './entities.js';
import { getRenderer } from './renderer.js';
import { getPhysics } from './physics.js';

const player = getPlayer();
const npcs = getNpcs();
const entities = [...npcs, player];

const update = deltaTime => {
  const { move } = getPhysics(deltaTime);
  entities.forEach(move);
};

const render = ctx => {
  const { draw } = getRenderer(ctx);
  entities.forEach(draw);
};

const loop = gameLoop(update, render);

window.addEventListener('load', loop.start);
window.addEventListener('unload', loop.stop);

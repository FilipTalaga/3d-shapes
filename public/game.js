import { gameLoop } from './engine.js';
import { getPlayer, getNpcs, getObstacles } from './entities.js';
import { getRenderer } from './renderer.js';
import { getPhysics } from './physics.js';

let entities, obstacles;

const reset = () => {
  const player = getPlayer();
  const npcs = getNpcs();
  entities = [...npcs, player];
  obstacles = getObstacles();
};

const update = deltaTime => {
  const { move } = getPhysics(deltaTime, obstacles);
  entities.forEach(move);
};

const render = ctx => {
  const { draw } = getRenderer(ctx);
  obstacles.forEach(draw);
  entities.forEach(draw);
};

const loop = gameLoop(update, render, reset);

window.addEventListener('load', loop.start);

window.addEventListener('unload', loop.stop);

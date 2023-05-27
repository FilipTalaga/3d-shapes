import { gameLoop } from './engine.js';
import { getPlayer, getNpcs, getObstacles } from './entities.js';
import { getRenderer } from './renderer.js';
import { getPhysics } from './physics.js';

let entities, obstacles;

const spawn = () => {
  const player = getPlayer();
  const npcs = getNpcs();
  entities = [...npcs, player];
  obstacles = getObstacles();
};

const update = (deltaTime, controller) => {
  const { move } = getPhysics(deltaTime, obstacles, controller);
  entities.forEach(move);
};

const render = ctx => {
  const { draw } = getRenderer(ctx);
  obstacles.forEach(draw);
  entities.forEach(draw);
};

const loop = gameLoop(update, render, spawn);

window.addEventListener('load', loop.start);

window.addEventListener('unload', loop.stop);

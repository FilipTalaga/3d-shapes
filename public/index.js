import { makeGame } from './engine.js';
import { spawnPlayer, movePlayer, drawPlayer } from './player/index.js';
import { spawnObstacles, drawObstacles } from './obstacle/index.js';
import { spawnNpcs, moveNpcs, drawNpcs } from './npc/index.js';
import { spawnCamera, moveCamera } from './camera/index.js';

const spawners = [spawnPlayer, spawnObstacles, spawnNpcs, spawnCamera];
const updaters = [moveNpcs, movePlayer, moveCamera];
const renderers = [drawObstacles, drawNpcs, drawPlayer];

const game = makeGame(spawners, updaters, renderers);

window.addEventListener('load', game.start);
window.addEventListener('unload', game.stop);

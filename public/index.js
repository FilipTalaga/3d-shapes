import { makeGame } from './engine.js';
import { spawnPlayer, movePlayer, drawPlayer } from './player/index.js';
import { spawnObstacles, drawObstacles } from './obstacle/index.js';
import { spawnNpcs, moveNpcs, drawNpcs } from './npc/index.js';

const spawners = [spawnObstacles, spawnNpcs, spawnPlayer];
const updaters = [moveNpcs, movePlayer];
const renderers = [drawObstacles, drawNpcs, drawPlayer];

const game = makeGame(spawners, updaters, renderers);

window.addEventListener('load', game.start);
window.addEventListener('unload', game.stop);

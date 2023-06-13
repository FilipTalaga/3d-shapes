import { makeGame } from './engine';
import { spawnPlayer, movePlayer, drawPlayer } from './player';
import { spawnObstacles, drawObstacles } from './obstacle';
import { spawnNpcs, moveNpcs, drawNpcs } from './npc';
import { spawnCamera, moveCamera } from './camera';
import { spawnBackground, moveBackground, drawBackground } from './background';
import { spawnUI, updateUI, drawUI } from './ui';

const spawners = [spawnBackground, spawnPlayer, spawnObstacles, spawnNpcs, spawnCamera, spawnUI];
const updaters = [moveNpcs, movePlayer, moveBackground, moveCamera, updateUI];
const renderers = [drawBackground, drawObstacles, drawNpcs, drawPlayer, drawUI];

const game = makeGame(spawners, updaters, renderers);

window.addEventListener('load', game.start);
window.addEventListener('unload', game.stop);

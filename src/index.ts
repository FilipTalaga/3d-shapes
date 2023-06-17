// import { spawnPlayer, movePlayer, drawPlayer } from './player';
// import { spawnBackground, moveBackground, drawBackground } from './background';
// import { spawnUI, updateUI, drawUI } from './ui';
import { createGame } from './engine/game';
import { makeCity } from './scenes/city';

// const spawners = [spawnBackground, spawnPlayer, , spawnUI];
// const updaters = [movePlayer, moveBackground, updateUI];
// const renderers = [drawBackground, drawPlayer, drawUI];

const game = createGame();

const scene = {
  spawn: () => {
    const npc1 = game.createGameObject();
    const npc2 = game.createGameObject();

    return [npc1, npc2];
  },
};

game.setScene(scene);

window.addEventListener('load', game.start);
window.addEventListener('unload', game.stop);

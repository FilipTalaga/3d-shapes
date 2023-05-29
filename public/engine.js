import { getController } from './controller.js';
import { startEvents, stopEvents } from './utils.js';
import { config } from './config.js';

export const makeGame = (spawners, updaters, renderers) => {
  const canvas = document.getElementById('gameCanvas');

  const draw = (x, y, width, height) => {
    game.ctx.fillRect(x - game.camera.x, y - game.camera.y, width, height);
  };

  let game = {
    camera: {},
    entities: {},
    deltaTime: 0,
    controller: getController(),
    ctx: canvas.getContext('2d'),
    draw,
  };

  let requestId;
  let isPaused = false;
  let lastTime = 0;

  const requestFrame = time => {
    lastTime = time;
    requestId = requestAnimationFrame(tick);
  };

  const tick = time => {
    game.deltaTime = (time - lastTime) / 1000;

    /* Skip empty animation frame */
    if (game.deltaTime === 0) return;

    updaters.forEach(update => update(game));
    game.ctx.clearRect(0, 0, game.camera.width, game.camera.height);
    renderers.forEach(render => render(game));

    requestFrame(time);
  };

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const reset = () => {
    stop();
    start();
  };

  const pause = () => {
    if (document.visibilityState === 'hidden' && !isPaused) {
      isPaused = true;
      cancelAnimationFrame(requestId);
      return;
    }

    isPaused = false;
    requestFrame(performance.now());
  };

  const events = {
    resize: reset,
    visibilitychange: pause,
    keydown: game.controller.registerKey,
    keyup: game.controller.releaseKey,
  };

  const start = () => {
    resizeCanvas();
    spawners.forEach(spawn => spawn(game));
    startEvents(events);
    requestFrame(performance.now());
  };

  const stop = () => {
    cancelAnimationFrame(requestId);
    stopEvents(events);
  };

  return { start, stop };
};

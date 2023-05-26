import { getController } from './controller.js';
import { startEvents, stopEvents } from './utils.js';

export const gameLoop = (update, render, spawn) => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const controller = getController();
  const { registerKey, releaseKey } = controller;

  let requestId;
  let isPaused = false;
  let lastTime = 0;

  const requestFrame = time => {
    lastTime = time;
    requestId = requestAnimationFrame(tick);
  };

  const tick = time => {
    const deltaTime = (time - lastTime) / 1000;

    /* Skip empty animation frame */
    if (deltaTime === 0) return;

    update(deltaTime, controller);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    render(ctx);

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
    keydown: registerKey,
    keyup: releaseKey,
  };

  const start = () => {
    resizeCanvas();
    spawn();
    startEvents(events);
    requestFrame(performance.now());
  };

  const stop = () => {
    cancelAnimationFrame(requestId);
    stopEvents(events);
  };

  return { start, stop };
};

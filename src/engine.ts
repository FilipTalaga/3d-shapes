import { getController } from './controller';
import { Game, GameCallback } from './types';
import { startEvents, stopEvents } from './utils';

export const makeGame = (
  spawners: GameCallback[],
  updaters: GameCallback[],
  renderers: GameCallback[],
) => {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

  const draw = (x: number, y: number, width: number, height: number) => {
    game.ctx!.fillRect(x - game.camera.x, y - game.camera.y, width, height);
  };

  let game: Game = {
    camera: { x: 0, y: 0, width: 0, height: 0 },
    background: {} as any,
    ui: {} as any,
    entities: {} as any,
    deltaTime: 0,
    controller: getController(),
    ctx: canvas.getContext('2d')!,
    draw,
  };

  let requestId: number;
  let isPaused = false;
  let lastTime = 0;

  const requestFrame = (time: number) => {
    lastTime = time;
    requestId = requestAnimationFrame(tick);
  };

  const tick = (time: number) => {
    game.deltaTime = (time - lastTime) / 1000;

    /* Skip empty animation frame */
    if (game.deltaTime === 0) return;

    updaters.forEach(update => update(game));
    game.ctx.clearRect(0, 0, game.camera.width, game.camera.height);
    renderers.forEach(render => render(game));

    requestFrame(time);
  };

  const resizeCanvas = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    game.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
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

  const events: Record<string, EventListener> = {
    resize: reset,
    visibilitychange: pause,
    keydown: game.controller.registerKey as EventListener,
    keyup: game.controller.releaseKey as EventListener,
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

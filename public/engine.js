export const gameLoop = (update, render, reset) => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  let requestId;
  let isPaused = false;
  let lastTime = 0;

  const updateCanvasSize = () => {
    reset();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const tick = time => {
    const deltaTime = (time - lastTime) / 1000;

    update(deltaTime);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    render(ctx);

    lastTime = time;
    requestId = requestAnimationFrame(tick);
  };

  const pause = () => {
    if (document.visibilityState === 'hidden' && !isPaused) {
      isPaused = true;
      cancelAnimationFrame(requestId);
      return;
    }

    isPaused = false;
    lastTime = performance.now();
    requestId = requestAnimationFrame(tick);
  };

  const start = () => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    window.addEventListener('visibilitychange', pause);
    requestId = requestAnimationFrame(tick);
  };

  const stop = () => {
    cancelAnimationFrame(requestId);
    window.removeEventListener('resize', updateCanvasSize);
    window.removeEventListener('visibilitychange', pause);
  };

  return { start, stop };
};

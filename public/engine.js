export const gameLoop = (update, render) => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  let requestId;
  let lastTime = 0;

  const updateCanvasSize = () => {
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

  const start = () => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    requestId = requestAnimationFrame(tick);
  };

  const stop = () => {
    cancelAnimationFrame(requestId);
    window.removeEventListener('resize', updateCanvasSize);
  };

  return { start, stop };
};

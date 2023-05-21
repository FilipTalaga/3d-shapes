const config = {
  updateTick: 10,
  entity: {
    size: { min: 50, max: 150 },
    speed: { min: 1, max: 5 },
    count: { min: 20, max: 50 },
  },
};

const canvas = document.getElementById('workspace');

const ctx = canvas.getContext('2d');

let gameEngine;

const updateCanvasSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.onresize = updateCanvasSize;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getEntities = () => {
  const count = getRandomInt(config.entity.count.min, config.entity.count.max);
  const hueOffset = getRandomInt(0, 360);

  return new Array(count).fill(0).map((_, index) => {
    const width = getRandomInt(config.entity.size.min, config.entity.size.max);
    const height = getRandomInt(config.entity.size.min, config.entity.size.max);

    return {
      x: window.innerWidth / 2 - width / 2,
      y: window.innerHeight / 2 - height / 2,
      width,
      height,
      color: `hsl(${(hueOffset + (360 / count) * index) % 360}, 80%, 50%)`,
      speed: getRandomInt(config.entity.speed.min, config.entity.speed.max),
      direction: getRandomInt(0, 360),
    };
  });
};

const entities = getEntities();

const getReflectionAngle = (currentAngle, orientation) =>
  ((orientation === 'horizontal' ? 360 : 180) - currentAngle + 360) % 360;

const getOffset = (direction, speed) => ({
  x: speed * Math.cos(direction * (Math.PI / 180)),
  y: speed * Math.sin(direction * (Math.PI / 180)),
});

const drawEntity = ({ x, y, width, height, color }) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const moveEntity = entity => {
  let offset = getOffset(entity.direction, entity.speed);

  const newX = entity.x + offset.x;
  const newY = entity.y + offset.y;

  if (newX + entity.width >= canvas.width || newX <= 0) {
    entity.direction = getReflectionAngle(entity.direction, 'vertical');
    return;
  }

  if (newY + entity.height >= canvas.height || newY <= 0) {
    entity.direction = getReflectionAngle(entity.direction, 'horizontal');
    return;
  }

  entity.x = newX;
  entity.y = newY;
};

const update = () => {
  entities.forEach(moveEntity);
};

const render = () => {
  entities.forEach(drawEntity);
};

const startUpdate = () => {
  gameEngine = setInterval(update, config.updateTick);
};

const startRender = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  render();
  requestAnimationFrame(startRender);
};

/* Initialize */
window.onload = () => {
  updateCanvasSize();
  startUpdate();
  startRender();
};

/* Clean up */
window.onbeforeunload = () => {
  clearInterval(gameEngine);
};

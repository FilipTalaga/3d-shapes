const config = {
  updateTick: 10 /* Time the engine takes for each logic update (ms) */,
  entity: {
    size: {
      min: 30 /* Minimum size in (px) */,
      max: 100 /* Maximum size in (px) */,
      ratio: 0.5 /* Maximum difference between height and width (percentage) */,
    },
    speed: {
      min: 2 /* Minimum speed of entities */,
      max: 6 /* Maximum speed of entities */,
    },
    count: {
      min: 40 /* Minimum number of entities */,
      max: 80 /* Maximum number of entities */,
    },
    lightness: 4 /* Determines how light the objects are in relation to size (1 - heavy, 10 - extremaly light) */,
  },
};

const canvas = document.getElementById('workspace');
const ctx = canvas.getContext('2d');

let gameEngine, entities;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const updateCanvasSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  entities = getEntities();
};

const getEntities = () => {
  const count = getRandomInt(config.entity.count.min, config.entity.count.max);
  const hueOffset = getRandomInt(0, 360);

  return new Array(count).fill(0).map((_, index) => {
    const size = getRandomInt(config.entity.size.min, config.entity.size.max);

    const sizeOffset = size * config.entity.size.ratio;

    const proposedWidth = getRandomInt(size - sizeOffset, size + sizeOffset);
    const proposedHeight = getRandomInt(size - sizeOffset, size + sizeOffset);

    const viewWidthMax = window.innerWidth * 0.5;
    const viewHeightMax = window.innerHeight * 0.5;

    const width = proposedWidth >= viewWidthMax ? viewWidthMax : proposedWidth;
    const height = proposedHeight >= viewHeightMax ? viewHeightMax : proposedHeight;

    return {
      x: window.innerWidth / 2 - width / 2,
      y: window.innerHeight / 2 - height / 2,
      width,
      height,
      color: `hsl(${(hueOffset + (360 / count) * index) % 360}, 80%, 50%)`,
      speed: getRandomInt(config.entity.speed.min, config.entity.speed.max),
      direction: getRandomInt(0, 360),
      mass: Math.max(width, height) / Math.pow(10, config.entity.lightness),
    };
  });
};

const getReflectionAngle = (currentAngle, orientation) =>
  ((orientation === 'horizontal' ? 360 : 180) - currentAngle + 360) % 360;

const getOffset = (direction, speed) => ({
  x: speed * Math.cos(direction * (Math.PI / 180)),
  y: speed * Math.sin(direction * (Math.PI / 180)),
});

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
  entity.speed = entity.speed <= 0 ? 0 : entity.speed - entity.mass;
};

const drawEntity = ({ x, y, width, height, color }) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
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

/* Update */
window.onresize = updateCanvasSize;

/* Clean up */
window.onbeforeunload = () => {
  clearInterval(gameEngine);
};

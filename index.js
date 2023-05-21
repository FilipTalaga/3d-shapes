const config = {
  updateTick: 10,
  colors: ['red', 'blue', 'green', 'yellow', 'orange', 'purple'],
  entity: {
    size: { min: 50, max: 150 },
    speed: { min: 1, max: 3 },
  },
};

const canvas = document.getElementById('workspace');
const ctx = canvas.getContext('2d');

let gameEngine;

const getRandomColor = () => config.colors[Math.floor(Math.random() * config.colors.length)];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getEntity = () => ({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: getRandomInt(config.entity.size.min, config.entity.size.max),
  height: getRandomInt(config.entity.size.min, config.entity.size.max),
  color: getRandomColor(),
  speed: getRandomInt(config.entity.speed.min, config.entity.speed.max),
  direction: getRandomInt(0, 360),
});

const entities = new Array(10).fill(0).map(getEntity);

function getReflectionAngle(currentAngle, boundaryOrientation) {
  let reflectionAngle;

  if (boundaryOrientation === 'horizontal') {
    reflectionAngle = (360 - currentAngle) % 360;
  } else if (boundaryOrientation === 'vertical') {
    reflectionAngle = (180 - currentAngle) % 360;
  }

  if (reflectionAngle < 0) {
    reflectionAngle += 360;
  }

  return reflectionAngle;
}

const getOffset = (direction, speed) => {
  const angle = direction * (Math.PI / 180);

  return { x: speed * Math.cos(angle), y: speed * Math.sin(angle) };
};

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
    moveEntity(entity);
    return;
  }

  if (newY + entity.height >= canvas.height || newY <= 0) {
    entity.direction = getReflectionAngle(entity.direction, 'horizontal');
    moveEntity(entity);
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
  startUpdate();
  startRender();
};

/* Clean up */
window.onbeforeunload = () => {
  clearInterval(gameEngine);
};

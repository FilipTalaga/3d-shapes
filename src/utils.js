export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomColor = ({ s = 0.8, l = 0.5 } = {}) =>
  `hsl(${getRandomInt(0, 360)}, ${s * 100}%, ${l * 100}%)`;

export const startEvents = events =>
  Object.entries(events).forEach(([name, handler]) => {
    window.addEventListener(name, handler);
  });

export const stopEvents = events =>
  Object.entries(events).forEach(([name, handler]) => {
    window.removeEventListener(name, handler);
  });

export const getMultiple = (getter, count) =>
  new Array(count).fill().map((_, index) => getter(index, count));

export const collides = (entity, obstacle) =>
  entity.x < obstacle.x + obstacle.width &&
  entity.x + entity.width > obstacle.x &&
  entity.y < obstacle.y + obstacle.height &&
  entity.y + entity.height > obstacle.y;

export const xor = (...conditions) => !(conditions.every(Boolean) || !conditions.some(Boolean));

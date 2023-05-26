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

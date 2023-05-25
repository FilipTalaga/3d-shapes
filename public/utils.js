export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomColor = ({ s = 0.8, l = 0.5 } = {}) =>
  `hsl(${getRandomInt(0, 360)}, ${s * 100}%, ${l * 100}%)`;

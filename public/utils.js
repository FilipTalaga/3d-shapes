export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomColor = () => `hsl(${getRandomInt(0, 360)}, 80%, 50%)`;

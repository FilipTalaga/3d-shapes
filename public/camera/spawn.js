export const spawnCamera = game => {
  game.camera = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    velocity: {
      x: 0,
      y: 0,
    },
  };
};

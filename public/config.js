export const config = {
  simulation: {
    velocity: {
      x: { min: 0, max: 5000 },
      y: { min: -5000, max: 5000 },
    },
  },
  world: {
    width: 10000,
    height: 3000,
    gravity: 5000,
    bounce: 0.6,
    friction: 6000,
    airResistance: 1000,
  },
  player: {
    size: {
      min: 40,
      max: 60,
      ratio: 0.2,
    },
    speed: 800,
    jump: 2000,
  },
  entity: {
    count: { min: 300, max: 600 },
    size: {
      min: 15,
      max: 30,
      ratio: 0.5,
    },
    playerBounce: 1000,
  },
  obstacle: {
    wallSize: 20,
    count: { min: 80, max: 120 },
    width: { min: 400, max: 800 },
    height: { min: 20, max: 40 },
  },
};

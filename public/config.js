export const config = {
  simulation: {
    velocity: {
      x: { min: 0, max: 5000 },
      y: { min: -5000, max: 5000 },
    },
  },
  world: {
    gravity: 6000,
    bounce: 0.6,
    friction: 6000,
    airResistance: 1000,
  },
  player: {
    size: {
      min: 100,
      max: 150,
      ratio: 0.2,
    },
  },
  entity: {
    count: { min: 100, max: 200 },
    size: {
      min: 20,
      max: 40,
      ratio: 0.5,
    },
  },
  obstacle: {
    count: { min: 2, max: 8 },
    height: { min: 20, max: 40 },
  },
};

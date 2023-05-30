export const config = {
  world: {
    width: 10000,
    height: 5000,
    gravity: 1200,
  },
  entities: {
    player: {
      color: 'hsl(0, 0%, 95%)',
      size: 60,
      speed: 800, // default: 400
      jump: 1200, // default: 600
      accelerationTime: 0.2,
    },
    npcs: {
      count: { min: 1000, max: 2000 },
      size: {
        min: 15,
        max: 30,
        ratio: 0.5,
      },
      velocity: {
        x: { min: 0, max: 5000 },
        y: { min: -5000, max: 5000 },
      },
      playerBounce: 1000,
      bounce: 0.6,
      friction: 6000,
      airResistance: 1000,
    },
  },
  obstacles: {
    walls: {
      color: 'hsl(0, 0%, 5%)',
      size: 20,
    },
    platforms: {
      count: { min: 80, max: 120 },
      width: { min: 400, max: 800 },
      height: { min: 20, max: 40 },
    },
  },
  environment: {
    background: {
      rows: 10,
      light: { min: 20, max: 60 },
    },
  },
};

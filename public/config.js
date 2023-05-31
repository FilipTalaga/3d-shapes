export const config = {
  world: {
    width: 20_000,
    height: 2000,
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
      count: { min: 80, max: 120 },
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
      size: 0,
    },
    platforms: {
      count: { min: 40, max: 60 },
      width: { min: 400, max: 800 },
      height: { min: 20, max: 40 },
    },
  },
  camera: {
    position: {
      x: 0.5,
      y: 0.6,
    },
  },
  environment: {
    background: {
      rows: 5,
      cols: {
        width: 100,
        ratio: 0.5,
      },
      light: { min: 20, max: 60 },
    },
  },
};

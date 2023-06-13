export const config = {
  world: {
    width: 20_000,
    height: 2000,
    gravity: 1600, // default: 1200
    maxVelocity: 3000,
  },
  entities: {
    player: {
      color: 'hsl(0, 0%, 95%)',
      size: 60,
      speed: 600, // default: 400
      jump: 800, // default: 600
      accelerationTime: 0.2,
      maxJumps: 2,
      rotation: {
        air: 180,
        ground: 180 * 3,
      },
    },
    npcs: {
      count: { min: 200, max: 300 },
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
      padding: [800, 400, 200, 400],
      count: { min: 60, max: 80 },
      height: { min: 40, max: 40 },
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

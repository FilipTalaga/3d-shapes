import { createController } from './controller';
import { Circle, GameObject, Scene, Vec2 } from './types';
import { startEvents, stopEvents } from './utils';

type Physics = ReturnType<typeof createPhysics>;
type Controller = ReturnType<typeof createController>;
type Graphics = ReturnType<typeof createGraphics>;

export const createGraphics = () => {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  const draw = ({ shape, apperance }: GameObject) => {
    if (!apperance) return;

    const { color } = apperance;
    const {
      pos: {
        current: { x, y },
      },
      form,
    } = shape;

    ctx.fillStyle = color;

    if (form.type === 'rect') {
      ctx.fillRect(x, y, form.size.width, form.size.height);
    }

    if (form.type === 'circle') {
      ctx.beginPath();
      ctx.arc(x, y, form.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  };

  const clear = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };

  const resize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  };

  return { draw, clear, resize };
};

export const createPhysics = (objects: GameObject[], controller: Controller) => {
  const G = 1000;

  const getLen = (vec: Vec2) => Math.sqrt(vec.x ** 2 + vec.y ** 2);

  const update = (entity: GameObject, deltaTime: number, targets: GameObject[]) => {
    if (!entity.physics) return;

    const { shape, physics } = entity;

    const applyConstraint = () => {
      if (shape.form.type !== 'circle') return;

      const constraint = objects[0].shape;
      const form = constraint.form as Circle;

      const toObj = {
        x: shape.pos.current.x - constraint.pos.current.x,
        y: shape.pos.current.y - constraint.pos.current.y,
      };

      const dist = getLen(toObj);

      if (dist > form.radius - shape.form.radius) {
        const n = {
          x: toObj.x / dist,
          y: toObj.y / dist,
        };
        shape.pos.current.x = constraint.pos.current.x + n.x * (form.radius - shape.form.radius);
        shape.pos.current.y = constraint.pos.current.y + n.y * (form.radius - shape.form.radius);
      }
    };

    let collides = false;

    const solveCollision = () => {
      targets.forEach(target => {
        if (!target.physics || target.shape.form.type !== 'circle' || shape.form.type !== 'circle')
          return;

        const collisionAxis = {
          x: shape.pos.current.x - target.shape.pos.current.x,
          y: shape.pos.current.y - target.shape.pos.current.y,
        };

        const dist = getLen(collisionAxis);

        const safeDistance = shape.form.radius + target.shape.form.radius;

        if (dist < safeDistance) {
          collides = true;

          const n = {
            x: collisionAxis.x / (dist || 1),
            y: collisionAxis.y / (dist || 1),
          };

          const delta = safeDistance - dist;

          shape.pos.current.x += 0.5 * delta * n.x;
          shape.pos.current.y += 0.5 * delta * n.y;

          target.shape.pos.current.x -= 0.5 * delta * n.x;
          target.shape.pos.current.y -= 0.5 * delta * n.y;
        }
      });
    };

    /* Verlet integration */
    const updatePosition = (dt: number) => {
      const velocity = {
        x: shape.pos.current.x - shape.pos.old.x,
        y: shape.pos.current.y - shape.pos.old.y,
      };

      shape.pos.old.x = shape.pos.current.x;
      shape.pos.old.y = shape.pos.current.y;

      const damping = collides ? 0.99 : 1;
      collides = false;

      shape.pos.current.x += velocity.x * damping + physics.acc.x * dt ** 2;
      shape.pos.current.y += velocity.y * damping + physics.acc.y * dt ** 2;

      physics.acc.x = 0;
      physics.acc.y = 0;
    };

    const accelerate = (force: Vec2) => {
      physics.acc.x += force.x / physics.mass;
      physics.acc.y += force.y / physics.mass;
    };

    const applyGravity = () => accelerate({ x: 0, y: G * physics.mass });

    const applyControls = () => {
      const force = 5000;

      if (controller.controlsPressed.ArrowRight) {
        accelerate({ x: force, y: 0 });
      }
      if (controller.controlsPressed.ArrowLeft) {
        accelerate({ x: -force, y: 0 });
      }
      if (controller.controlsPressed.ArrowUp) {
        accelerate({ x: 0, y: -force });
      }
      if (controller.controlsPressed.ArrowDown) {
        accelerate({ x: 0, y: force });
      }
    };

    applyControls();
    applyGravity();
    applyConstraint();
    solveCollision();
    updatePosition(deltaTime);
  };

  return { update };
};

export const createGame = (scene: Scene) => {
  const controller = createController();
  const graphics = createGraphics();

  let objects: GameObject[];
  let physics: Physics;

  let rafId: number;
  let isPaused = false;
  let lastTime = 0;

  const requestFrame = (time: number) => {
    lastTime = time;
    rafId = requestAnimationFrame(tick);
  };

  const tick = (time: number) => {
    const deltaTime = (time - lastTime) / 1000;

    /* Skip empty animation frame */
    if (deltaTime === 0) return;

    objects.forEach((obj, i) => physics.update(obj, deltaTime, objects.slice(i + 1)));
    graphics.clear();
    objects.forEach(obj => graphics.draw(obj));

    requestFrame(time);
  };

  const reset = () => {
    stop();
    start();
  };

  const pause = () => {
    if (document.visibilityState === 'hidden' && !isPaused) {
      isPaused = true;
      cancelAnimationFrame(rafId);
      return;
    }

    isPaused = false;
    requestFrame(performance.now());
  };

  const events: Record<string, EventListener> = {
    resize: reset,
    visibilitychange: pause,
    keydown: controller.registerKey,
    keyup: controller.releaseKey,
  };

  const start = () => {
    graphics.resize();

    objects = scene.spawn();
    physics = createPhysics(objects, controller);

    startEvents(events);
    requestFrame(performance.now());
  };

  const stop = () => {
    cancelAnimationFrame(rafId);
    stopEvents(events);
  };

  return { start, stop };
};

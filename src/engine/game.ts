import { makeControls } from './controls';
import { makeGraphics } from './graphics';
import { createPhysics } from './physics';
import { GameObject, Scene } from '../types';
import { startEvents, stopEvents } from '../utils';

export const createGame = () => {
  const controller = makeControls();
  const physics = createPhysics();
  const graphics = makeGraphics();

  let gameObjects: GameObject[];
  let requestId: number;
  let isPaused = false;
  let lastTime = 0;
  let scene: Scene;

  const requestFrame = (time: number) => {
    lastTime = time;
    requestId = requestAnimationFrame(tick);
  };

  const tick = (time: number) => {
    const deltaTime = (time - lastTime) / 1000;

    /* Skip empty animation frame */
    if (deltaTime === 0) return;

    // gameObjects.forEach(gameObject => gameObject.update?.(deltaTime));
    physics.update(deltaTime);
    graphics.clear();
    physics.objects.forEach(gameObject => gameObject.render?.(graphics));

    requestFrame(time);
  };

  const reset = () => {
    stop();
    start();
  };

  const pause = () => {
    if (document.visibilityState === 'hidden' && !isPaused) {
      isPaused = true;
      cancelAnimationFrame(requestId);
      return;
    }

    isPaused = false;
    requestFrame(performance.now());
  };

  const events: Record<string, EventListener> = {
    resize: reset,
    visibilitychange: pause,
    keydown: controller.register as EventListener,
    keyup: controller.release as EventListener,
  };

  const start = () => {
    graphics.resize();
    gameObjects = scene.spawn();
    gameObjects.forEach(obj => physics.addObject(obj));
    startEvents(events);
    requestFrame(performance.now());
  };

  const stop = () => {
    cancelAnimationFrame(requestId);
    stopEvents(events);
  };

  const createGameObject = () => {
    const entity = {
      width: 100,
      height: 100,
      color: 'red',
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      mass: 1,
    };

    function applyForce(forceX: number, forceY: number, dt: number) {
      // Calculate acceleration using Newton's second law (F = m * a)
      const accelerationX = forceX / entity.mass;
      const accelerationY = forceY / entity.mass;

      // Update object velocity using Euler's method (v = u + a * t)
      entity.velocity.x += accelerationX * dt;
      entity.velocity.y += accelerationY * dt;

      // console.log(entity.velocity.y);
    }

    // Function to update the object's position based on its velocity
    function updatePhysics(dt: number) {
      // Update object position using Euler's method (s = s + v * t)
      entity.position.x += entity.velocity.x * dt;
      entity.position.y += entity.velocity.y * dt;
    }

    // Function to check if two physics objects collide
    function collidesWith(otherObject: any) {
      // Implement collision detection logic here
      // Return true if the objects collide, false otherwise
    }

    const update = (dt: number) => {
      updatePhysics(dt);
    };

    const render = () => {
      graphics.draw(entity);
    };

    return { entity, update, render, applyForce, collidesWith };
  };

  const setScene = (value: Scene) => {
    scene = value;
  };

  return { start, stop, setScene, createGameObject };
};

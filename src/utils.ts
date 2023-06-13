import { Entity } from './types';

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomColor = ({ s = 0.8, l = 0.5 } = {}) =>
  `hsl(${getRandomInt(0, 360)}, ${s * 100}%, ${l * 100}%)`;

export const startEvents = (events: Record<string, EventListener>) =>
  Object.entries(events).forEach(([name, handler]) => {
    window.addEventListener(name, handler);
  });

export const stopEvents = (events: Record<string, EventListener>) =>
  Object.entries(events).forEach(([name, handler]) => {
    window.removeEventListener(name, handler);
  });

export const getMultiple = <T>(getter: (index: number, count: number) => T, count: number) =>
  new Array(count).fill(null).map((_, index) => getter(index, count));

export const collides = (entity: Entity, obstacle: Entity) =>
  entity.x < obstacle.x + obstacle.width &&
  entity.x + entity.width > obstacle.x &&
  entity.y < obstacle.y + obstacle.height &&
  entity.y + entity.height > obstacle.y;

export const xor = (...conditions: boolean[]) =>
  !(conditions.every(Boolean) || !conditions.some(Boolean));

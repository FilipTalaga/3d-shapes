import { createGame } from './engine';
import { Form, GameObject, GameObjectInit } from './types';
import { getRandomColor, getRandomInt } from './utils';

const getProps = <T>(obj: T | null | undefined, getter: (value: T) => Record<string, T>) =>
  obj ? getter(obj) : {};

const createGameObject = (init: GameObjectInit = {}): GameObject => {
  const { shape, apperance, physics } = init;

  const getForm = (): Form => {
    if (shape?.form?.type === 'rect') {
      return {
        type: 'rect',
        size: { width: shape.form.size.width || 0, height: shape.form.size.height || 0 },
      };
    }

    if (shape?.form?.type === 'circle') {
      return { type: 'circle', radius: shape.form.radius || 0 };
    }

    return { type: 'rect', size: { width: 0, height: 0 } };
  };

  return {
    shape: {
      pos: {
        current: { x: shape?.pos?.x || 0, y: shape?.pos?.y || 0 },
        old: { x: shape?.pos?.x || 0, y: shape?.pos?.y || 0 },
      },
      form: getForm(),
    },
    ...getProps(apperance, ({ color }) => ({
      apperance: {
        color: color || 'black',
      },
    })),
    ...getProps(physics, ({ type, acc, mass }) => ({
      physics: {
        type: type || 'dynamic',
        acc: { x: acc?.x || 0, y: acc?.y || 0 },
        mass: mass || 1,
      },
    })),
  };
};

const scene = {
  spawn: (): GameObject[] => {
    const seed = Math.min(window.innerWidth, window.innerHeight);
    const r = (seed / 2) * 0.8;

    const constraint = createGameObject({
      shape: {
        pos: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        form: {
          type: 'circle',
          radius: (seed / 2) * 0.8,
        },
      },
      apperance: {
        color: '#333',
      },
    });

    const balls = Array(100)
      .fill(constraint.shape.pos.current)
      .map(center => {
        const size = getRandomInt(r * 0.01, r * 0.04);

        return createGameObject({
          shape: {
            pos: {
              x: getRandomInt(center.x - r * 0.5, center.x + r * 0.5),
              y: getRandomInt(center.y - r * 0.5, center.y + r * 0.5),
            },
            form: {
              type: 'circle',
              radius: size,
            },
          },
          apperance: { color: getRandomColor() },
          physics: {
            mass: size * 0.3,
          },
        });
      });

    const objs = [constraint, ...balls];

    return objs;
  },
};

const game = createGame(scene);

window.addEventListener('load', game.start);
window.addEventListener('unload', game.stop);

import { Game } from '../types';

export const updateUI = ({ controller: { controlsPressed }, ui: { debug } }: Game) => {
  if (controlsPressed.KeyD && !debug.lock) {
    debug.open = !debug.open;
    debug.lock = true;
  }

  if (!controlsPressed.KeyD) {
    debug.lock = false;
  }
};

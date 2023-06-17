export const makeControls = () => {
  let keys: Record<string, boolean> = {};

  const register = ({ code }: KeyboardEvent) => {
    keys[code] = true;
  };

  const release = ({ code }: KeyboardEvent) => {
    keys[code] = false;
  };

  return { keys, register, release };
};

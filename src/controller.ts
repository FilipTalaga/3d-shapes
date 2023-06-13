export const getController = () => {
  let controlsPressed: Record<string, boolean> = {};

  const registerKey = ({ code }: KeyboardEvent) => {
    controlsPressed[code] = true;
  };

  const releaseKey = ({ code }: KeyboardEvent) => {
    controlsPressed[code] = false;
  };

  return { controlsPressed, registerKey, releaseKey };
};

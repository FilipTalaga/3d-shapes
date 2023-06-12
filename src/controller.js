export const getController = () => {
  let controlsPressed = {};

  const registerKey = ({ code }) => (controlsPressed[code] = true);

  const releaseKey = ({ code }) => (controlsPressed[code] = false);

  return { controlsPressed, registerKey, releaseKey };
};

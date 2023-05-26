export const getController = () => {
  let controlsPressed = { space: false, left: false, right: false };

  const registerKey = ({ code }) => {
    if (code === 'Space') {
      controlsPressed.space = true;
    }
  };

  const releaseKey = ({ code }) => {
    if (code === 'Space') {
      controlsPressed.space = false;
    }
  };

  return { controlsPressed, registerKey, releaseKey };
};

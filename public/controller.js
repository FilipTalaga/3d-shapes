export const getController = () => {
  let controlsPressed = { space: false, left: false, right: false };

  const registerKey = ({ code }) => {
    if (code === 'Space') controlsPressed.space = true;
    if (code === 'ArrowLeft') controlsPressed.left = true;
    if (code === 'ArrowRight') controlsPressed.right = true;
  };

  const releaseKey = ({ code }) => {
    if (code === 'Space') controlsPressed.space = false;
    if (code === 'ArrowLeft') controlsPressed.left = false;
    if (code === 'ArrowRight') controlsPressed.right = false;
  };

  return { controlsPressed, registerKey, releaseKey };
};

export const createController = () => {
  let controlsPressed: Record<string, boolean> = {};

  const registerKey: EventListener = (event: Event) => {
    const { code } = event as KeyboardEvent;
    controlsPressed[code] = true;
  };

  const releaseKey: EventListener = (event: Event) => {
    const { code } = event as KeyboardEvent;
    controlsPressed[code] = false;
  };

  return { controlsPressed, registerKey, releaseKey };
};

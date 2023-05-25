export const getRenderer = ctx => {
  const drawEntity = entity => {
    ctx.fillStyle = entity.color;
    ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
  };

  return { drawEntity };
};

export type Entity = {
  position: { x: number; y: number };
  width: number;
  height: number;
  color?: string;
};

export type GameObject = {
  render?: (graphics: any) => void;
  update?: (deltaTime: number) => void;
};

export type Scene = {
  spawn: () => GameObject[];
};

export type GameCallback = (game: Game) => void;

export type Player = Entity & {
  velocity: {
    x: number;
    y: number;
  };
  standing: boolean;
  jumpReady: boolean;
  jumps: number;
  angle: number;
  direction: number;
  color: string;
};

export type Obstacle = Entity & {
  color: string;
};

export type Npc = Entity & {
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  direction: number;
};

export type Layer = Entity & {
  parallax: number;
  color: string;
  columns: Entity[];
};

export type Ui = {
  debug: {
    open: boolean;
    lock: boolean;
  };
};

export type Background = {
  hue: number;
  layers: Layer[];
};

export type Game = {
  camera: Entity;
  background: Background;
  ui: Ui;
  entities: {
    player: Player;
    obstacles: Obstacle[];
    npcs: Npc[];
  };
  deltaTime: number;
  controller: any;
  ctx: CanvasRenderingContext2D;
  draw: (x: number, y: number, width: number, height: number) => void;
};

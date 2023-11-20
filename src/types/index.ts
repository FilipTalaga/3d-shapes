export type Entity = {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
};

export type Vec2 = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type VerletPos = {
  old: Vec2;
  current: Vec2;
};

export type Rect = {
  type: 'rect';
  size: Size;
};

export type Circle = {
  type: 'circle';
  radius: number;
};

export type Form = Rect | Circle;

export type Shape = {
  pos: VerletPos;
  form: Form;
};

export type InitShape = Omit<Shape, 'pos'> & {
  pos: Vec2;
};

export type Apperance = {
  color: string;
};

export type Physics = {
  type: 'dynamic' | 'static';
  acc: Vec2;
  mass: number;
};

export type GameObject = {
  shape: Shape;
  apperance?: Apperance;
  physics?: Physics;
};

export type GameObjectInit = {
  shape?: Partial<InitShape>;
  apperance?: Partial<Apperance>;
  physics?: Partial<Physics>;
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

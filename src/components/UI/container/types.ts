export interface Container {
  id: number;
  parentId: number | null;
  x: number;
  y: number;
  width: number;
  height: number;
  effect: string;
  color: string;
}

export interface Widget {
  type: string;
  id: number;
  name: string;
  containerId: number;
  duration: Duration;
  objectFit: string;
  fileName: string;
  order: number;
  mute?: boolean;
}

export interface Duration {
  value: number;
  untilDone: boolean;
}


export interface Cube {
  id: number;
  value: number;
  x: number;
  y: number;
}

export interface Game2048State {
  cubes: Cube[];
  score: number;
  gameOver: boolean;
}

export interface IPokemon {
  id: number;
  name: string;
  image: string;
}

export interface Selected {
  name: string;
  type: string[];
  stats: Stat[];
  image: string;
}

export interface Stat {
  name: string;
  value: number;
}

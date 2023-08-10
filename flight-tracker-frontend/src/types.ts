export interface Entry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export interface NewEntry extends Entry {
  comment: string;
}
export interface EntryProps {
  date: string,
  weather: string,
  visibility: string,
}
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}
export type EntryFormObject = Omit<NewEntry, "id">;
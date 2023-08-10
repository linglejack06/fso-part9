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
export type EntryFormObject = Omit<NewEntry, "id">;
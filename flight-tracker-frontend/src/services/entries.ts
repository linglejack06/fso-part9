import axios from 'axios';
import { Entry, EntryFormObject } from '../types';

export const getAllEntries = async (): Promise<Entry[]> => {
  const response = await axios.get<Entry[]>('http://localhost:3000/api/diaries');
  return response.data;
}

export const createEntry = async (entryObject: EntryFormObject): Promise<Entry> => {
  const response = await axios.post<Entry>('http://localhost:3000/api/diaries', {
    ...entryObject,
    id: Math.floor(Math.random() * 100000),
  });
  return response.data;
}
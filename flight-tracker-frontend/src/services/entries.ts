import axios from 'axios';
import { Entry } from '../types';

export const getAllEntries = async (): Promise<Entry[]> => {
  const response = await axios.get<Entry[]>('http://localhost:3000/api/diaries');
  return response.data;
}
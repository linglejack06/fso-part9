import axios from 'axios';
import { Note } from '../types';

export const getAllNotes = async(): Promise<Note[]> => {
  const response = await axios.get<Note[]>('http://localhost:3000/notes');
  return response.data;
}

export const createNote = async(noteToAdd: Note): Promise<Note> => {
  const response = await axios.post<Note>('http://localhost:3000/notes', noteToAdd);
  return response.data;
}
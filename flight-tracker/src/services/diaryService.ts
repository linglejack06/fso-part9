import diaries from '../../data/entries';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};
const addDiary = (newEntry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...newEntry,
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
}; 
const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((diary) => diary.id === id);
  return entry;
};
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id, date, weather, visibility,
  }));
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
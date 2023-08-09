/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const entry = diaryService.findById(Number(id));
  if (entry) {
    res.send(entry);
  } else {
    res.status(400).end();
  }
});
router.post('/', (req, res) => {
  try {
    const newEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newEntry);
    res.json(addedEntry);
  } catch (error: any) {
    res.status(400).send('Something went wrong:' + error.message);
  }
});

export default router;
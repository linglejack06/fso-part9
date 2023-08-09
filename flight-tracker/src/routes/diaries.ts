/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import diaryService from '../services/diaryService';

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
  const { date, weather, visibility, comment } = req.body;
  const addedEntry = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment,
  });
  res.json(addedEntry);
});

export default router;
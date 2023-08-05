/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import calculateBmi from './bmiCalculator';
import isNotNumber from './utils';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello full stack');
});
app.get('/bmi', (req, res) => {
  if (!req.query.kg || !req.query.cm) {
    return res.status(400).send('Missing arguments');
  }
  if (!isNotNumber(req.query.kg) && !isNotNumber(req.query.cm)) {
    const result = calculateBmi(Number(req.query.kg), Number(req.query.cm));
    return res.json({
      bmi: result,
      height: req.query.cm,
      weight: req.query.kg,
    });
  }
  return res.status(400).send('Arguments are not numbers');
});
app.post('/exercises', (req, res) => {
  if (!req.body.dailyExercises || !req.body.target) {
    return res.status(400).send('missing arguments');
  }
  const convertedArr: number[] = req.body.dailyExercises.map((day: unknown) => {
    if(isNotNumber(day)) {
      return res.status(400).send('incorrectly formatted exercise array');
    }
    return Number(day);
  });
  if(isNotNumber(req.body.target)) {
    return res.status(400).send('Incorrectly formatted target value');
  }
  return res.json(exerciseCalculator(convertedArr, Number(req.body.target)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
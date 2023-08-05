import express from 'express';
import calculateBmi from './bmiCalculator';
import isNotNumber from './utils';

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
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
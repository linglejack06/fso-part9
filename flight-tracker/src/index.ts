/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import diaryRouter from './routes/diaries';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/ping', (_req, res) => {
  res.send('ping');
});
app.use('/api/diaries', diaryRouter);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
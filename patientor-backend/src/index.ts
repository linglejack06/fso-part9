/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from "express";
import cors from 'cors';
import diagnosesRouter from "./routes/diagnosesRoute";
import patientsRouter from "./routes/patientsRoute";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.listen(3001, () => {
  console.log('Server running at http://localhost:3001');
});
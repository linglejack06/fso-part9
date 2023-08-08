import express from 'express';
import { SafePatient } from '../types';
import patients from '../data/patients';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  const people: SafePatient[] = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
  return res.send(people);
});

export default patientsRouter;
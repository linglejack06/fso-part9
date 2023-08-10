import express from 'express';
import patientsService from '../services/patientsService';
import { PatientEntry, SafePatient } from '../types';
import toPatientEntry from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  const people = patientsService.getPatients();
  return res.send(people);
});
patientsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientsService.getPatientById(id);
  return res.send(patient);
});
patientsRouter.post('/', (req, res) => {
  try {
    const newPatient: PatientEntry = toPatientEntry(req.body);
    const patient: SafePatient = patientsService.addPatient(newPatient);
    return res.send(patient);
  } catch (error) {
    if (error && typeof error === 'object' && 'message' in error) {
      return res.status(400).send('Something went wrong: ' + error.message);
    }
    return res.status(400).end();
  }
});

export default patientsRouter;
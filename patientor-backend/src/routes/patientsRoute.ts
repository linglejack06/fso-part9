import express from 'express';
import patientsService from '../services/patientsService';
import { EntryFromForm, PatientEntry, SafePatient, Patient } from '../types';
import toPatientEntry, { toEntry } from '../utils';

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
patientsRouter.post('/:id/entries', (req, res) => {
  try {
    const newEntry: EntryFromForm = toEntry(req.body);
    const updatedPatient: Patient = patientsService.addEntryToPatient(newEntry, req.params.id);
    return res.send(updatedPatient);
  } catch(error: unknown) {
    if (error && typeof error === 'object' && 'message' in error) {
      return res.status(400).send('Something went wrong: ' + error.message);
    }
    return res.status(400).end();
  }
});

export default patientsRouter;
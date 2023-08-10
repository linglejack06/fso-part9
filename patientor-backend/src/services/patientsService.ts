/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Patient, SafePatient, PatientEntry } from "../types";
import patients from "../data/patients";
import { v1 as uuid } from 'uuid';

const getPatients = (): SafePatient[] => {
  const people: SafePatient[] = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
  return people;
};
const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};
const addPatient = (newEntry: PatientEntry): SafePatient => {
  const id: string = uuid();
  const patient: Patient = {
    ...newEntry,
    id,
  };
  const safePatient: SafePatient = {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    occupation: patient.occupation,
    gender: patient.gender,
  };
  return safePatient;
};
export default {
  getPatients,
  addPatient,
  getPatientById,
};
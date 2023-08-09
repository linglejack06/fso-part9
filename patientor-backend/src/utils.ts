import { PatientEntry } from "./types";

const toPatientEntry = (): PatientEntry => ({
  name: 'jack',
  ssn: '2',
  occupation: 'blue',
  gender: 'male',
  dateOfBirth: 'Blue'
});

export default toPatientEntry;
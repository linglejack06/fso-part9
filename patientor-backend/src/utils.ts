import { Gender, PatientEntry } from "./types";

const isString = (param: unknown): param is string => param instanceof String || typeof param === 'string';
const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map((val) => val.toString()).includes(gender);
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error ('Occupation is not a string');
  }
  return occupation;
};
const parseGender = (gender: unknown): Gender => {
  if(!isString(gender) || !isGender(gender)) {
    throw new Error('Gender must be either male or female');
  }
  return gender;
};
const parseName = (name: unknown): string => {
  if(!isString(name)) {
    throw new Error('name is not a string');
  }
  return name;
};
const parseSsn = (ssn: unknown): string => {
  if(!isString(ssn)) {
    throw new Error('ssn must be of type string');
  }
  return ssn;
};
const parseDateOfBirth = (date: unknown): string => {
  if(!isString(date) || !isDate(date)) {
    throw new Error('Date is not a string / not in correct format');
  }
  return date;
};
const toPatientEntry = (entry: unknown): PatientEntry => {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Missing request body');
  }

  if ('gender' in entry && 'name' in entry && 'ssn' in entry && 'dateOfBirth' in entry && 'occupation' in entry) {
    return {
      name: parseName(entry.name),
      ssn: parseSsn(entry.ssn),
      gender: parseGender(entry.gender),
      dateOfBirth: parseDateOfBirth(entry.dateOfBirth),
      occupation: parseOccupation(entry.occupation),
    };
  }
  throw new Error('Missing parameters');
};

export default toPatientEntry;
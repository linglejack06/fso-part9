import { Entry, EntryFromForm, Gender, PatientEntry, Diagnose, SickLeave, Discharge } from "./types";

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
const parseDate = (date: unknown): string => {
  if(!isString(date) || !isDate(date)) {
    throw new Error('Date is not a string / not in correct format');
  }
  return date;
};
const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error('Entries must be an array of objects');
  }
  const parsedEntries: Entry[] = entries.map((entry) => {
    if (typeof entry !== 'object') {
      throw new Error('Entries must be an object');
    }
    if (!isString(entry.type) || !["Hospital", "HealthCheck", "OccupationalHealthcare"].includes(entry.type as string)) {
      throw new Error('Entry must conform to types');
    }
    return entry as Entry;
  });
  return parsedEntries;
};
const parseDescription = (desc: unknown): string => {
  if (!isString(desc)) {
    throw new Error('Description must be of type string');
  }
  return desc;
};
const parseSpecialist = (val: unknown): string => {
  if (!isString(val)) {
    throw new Error('Specialist is not of type string');
  }
  return val;
};
const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
  if(!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnose['code']>;
  }
  return object.diagnosisCodes as Array<Diagnose['code']>;
};
const parseHealthRating = (val: unknown): number => {
  if(!val || typeof val !== 'number') {
    throw new Error('Health rating must be a number');
  }
  if (val > 3 || val < 0) {
    throw new Error('HEalth rating must be between 0 and 3');
  }
  return val;
};
const parseSickLeave = (obj: unknown): SickLeave => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Sick Leave must be an object');
  }
  if("startDate" in obj && "endDate" in obj) {
    return {
      startDate: parseDate(obj.startDate),
      endDate: parseDate(obj.endDate),
    };
  }
  throw new Error('Sick leave must contain a start and end date');
};
const parseEmployer = (emp: unknown): string => {
  if(!isString(emp)) {
    throw new Error('Employer must be a string');
  }
  return emp;
};
const parseDischarge = (obj: unknown): Discharge => {
  if(!obj || typeof obj !== 'object') {
    throw new Error('Discharge must be an object');
  }
  if("criteria" in obj && "date" in obj) {
    if(!isString(obj.criteria)) {
      throw new Error('Criteria must be a string');
    }
    return {
      date: parseDate(obj.date),
      criteria: obj.criteria,
    };
  }
  throw new Error('Discharge must contain criteria and a date');
};
const toPatientEntry = (entry: unknown): PatientEntry => {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Missing request body');
  }

  if ('gender' in entry && 'name' in entry && 'ssn' in entry && 'dateOfBirth' in entry && 'occupation' in entry && 'entries' in entry) {
    return {
      name: parseName(entry.name),
      ssn: parseSsn(entry.ssn),
      gender: parseGender(entry.gender),
      dateOfBirth: parseDate(entry.dateOfBirth),
      occupation: parseOccupation(entry.occupation),
      entries: parseEntries(entry.entries),
    };
  }
  throw new Error('Missing parameters');
};
export const toEntry = (entryObj: unknown): EntryFromForm => {
  if (!entryObj || typeof entryObj !== 'object') {
    throw new Error('Missing request body');
  }
  if("type" in entryObj && "description" in entryObj && "date" in entryObj && "specialist" in entryObj) {
    switch (entryObj.type) {
      case "HealthCheck":
        if ("healthCheckRating" in entryObj) {
          return {
            description: parseDescription(entryObj.description),
            type: entryObj.type,
            date: parseDate(entryObj.date),
            specialist: parseSpecialist(entryObj.specialist),
            healthCheckRating: parseHealthRating(entryObj.healthCheckRating),
            diagnosisCodes: parseDiagnosisCodes(entryObj),
          };
        }
        throw new Error('Missing health check rating value');
      case "Hospital": 
        if("discharge" in entryObj) {
          return {
            description: parseDescription(entryObj.description),
            type: entryObj.type,
            date: parseDate(entryObj.date),
            specialist: parseSpecialist(entryObj.specialist),
            diagnosisCodes: parseDiagnosisCodes(entryObj),
            discharge: parseDischarge(entryObj.discharge),
          };
        }
        throw new Error("Entry missing discharge value");
      case "OccupationalHealthcare":
        if("sickLeave" in entryObj && "employerName" in entryObj) {
          return {
            description: parseDescription(entryObj.description),
            type: entryObj.type,
            date: parseDate(entryObj.date),
            specialist: parseSpecialist(entryObj.specialist),
            diagnosisCodes: parseDiagnosisCodes(entryObj),
            sickLeave: parseSickLeave(entryObj.sickLeave),
            employerName: parseEmployer(entryObj.employerName),
          };
        }
        throw new Error('Entry missing sickLeave or employerName props');
      default:
        throw new Error("entry has wrong type");
    }
  }
  throw new Error("entry does not have base properties");
};
export default toPatientEntry;
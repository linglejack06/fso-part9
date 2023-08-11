export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
interface SickLeave {
  startDate: string;
  endDate: string;
}
interface Discharge {
  date: string;
  criteria: string;
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis['code'][];
}
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthCare";
  employerName: string;
  sickLeave: SickLeave;
}
interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge:  Discharge;
}
export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}
export interface ExpandedPatient extends Patient {
  entries: Entry[] | [];
}
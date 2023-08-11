import diagnosesService from "../../services/diagnosesService";
import { Entry, Diagnosis, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "../../types"
import { useState, useEffect } from "react";
import HealthRatingBar from "../HealthRatingBar";

interface EntryProps {
  entry: Entry;
}
interface HospitalEntryProps {
  children: React.ReactNode;
  entry: HospitalEntry;
}
interface HealthCheckEntryProps {
  children: React.ReactNode;
  entry: HealthCheckEntry;
}
interface OccupationalHealthcareEntryProps {
  children: React.ReactNode;
  entry: OccupationalHealthcareEntry;
}
const HospitalEntryCard = ({ entry, children }: HospitalEntryProps) => {
  return (
    <li>
      <h3>{entry.date}: {entry.description}</h3>
      <h4>Discharged on {entry.discharge.date}</h4>
      <h4>Criteria: {entry.discharge.criteria}</h4>
      {children}
    </li>
  )
}
const HealthCheckEntryCard = ({ entry, children }: HealthCheckEntryProps) => (
  <li>
    <h3>{entry.date}: {entry.description}</h3>
    <h4>Rating</h4>
    <HealthRatingBar rating={entry.healthCheckRating} showText={true}/>
    {children}
  </li>
)
const OccupationalHealthcareEntryCard = ({ entry, children }: OccupationalHealthcareEntryProps) => (
  <li>
    <h3>{entry.date}: {entry.description}</h3>
    {entry.sickLeave ? (
      <h4>Sick Leave from {entry.sickLeave.startDate}-{entry.sickLeave.endDate}</h4>
    ): null}
    {children}
  </li>
)
const EntryCard = ({ entry }: EntryProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  useEffect(() => {
    diagnosesService.getAllDiagnoses().then((data) => {
      const filtered = data.filter((diagnosis) => entry.diagnosisCodes?.includes(diagnosis.code));
      setDiagnoses(filtered);
    })
  })
  if (!diagnoses) {
    return null
  }
  switch (entry.type) {
    case "Hospital":
      return (
        <HospitalEntryCard entry={entry}>
          <h3>Diagnoses</h3>
          <ul>
            {diagnoses.map((diagnosis) => (
              <li>{diagnosis.code}: {diagnosis.name}</li>
            ))}
          </ul>
        </HospitalEntryCard>
      );
    case "HealthCheck":
      return (
        <HealthCheckEntryCard entry={entry}>
          <h3>Diagnoses</h3>
          <ul>
            {diagnoses.map((diagnosis) => (
              <li>{diagnosis.code}: {diagnosis.name}</li>
            ))}
          </ul>
      </HealthCheckEntryCard>
      );
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryCard entry={entry}>
          <h3>Diagnoses</h3>
          <ul>
            {diagnoses.map((diagnosis) => (
              <li>{diagnosis.code}: {diagnosis.name}</li>
            ))}
          </ul>
        </OccupationalHealthcareEntryCard>
      );
    default:
      throw new Error('Unhandled discriminated union type');
  }
}

export default EntryCard
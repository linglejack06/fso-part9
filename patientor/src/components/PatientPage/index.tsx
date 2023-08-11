import { useState, useEffect } from 'react';
import patientsService from "../../services/patients";
import { ExpandedPatient } from '../../types';
import { useParams } from 'react-router-dom';
import EntryCard from './Entry';

type PatientParams = {
  id: string;
}
const PatientPage = () => {
  const { id } = useParams<PatientParams>();
  const [patient, setPatient] = useState<ExpandedPatient | null>(null);
  useEffect(() => {
    if(!id) {
      throw new Error('Missing id');
    }
    patientsService.getOne(id).then((data) => {
      setPatient(data);
    })
  })
  if (!patient) {
    return <div>Error loading person with id {id}</div>
  }
  return (
    <div>
      <h1><b>{patient.name}:</b> {patient.gender}</h1>
      <p>Occupation: {patient.occupation}</p>
      <p>SSN: {patient.ssn}</p>
      <p>DOB: {patient.dateOfBirth}</p>
      <h2>Entries</h2>
      <ul>
        {patient.entries.map((entry) => (
          <EntryCard entry={entry} key={entry.id}/>
        ))}
        {patient.entries.length === 0 ? (
          <h3>No Entries found</h3>
        ) : null}
      </ul>
    </div>
  )
}

export default PatientPage;
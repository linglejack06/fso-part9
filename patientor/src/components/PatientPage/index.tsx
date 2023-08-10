import { useState, useEffect } from 'react';
import patientsService from "../../services/patients";
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';

type PatientParams = {
  id: string;
}
const PatientPage = () => {
  const { id } = useParams<PatientParams>();
  const [patient, setPatient] = useState<Patient | null>(null);
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
      {patient.ssn}
    </div>
  )
}

export default PatientPage;
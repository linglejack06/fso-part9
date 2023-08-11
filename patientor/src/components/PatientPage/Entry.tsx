import diagnosesService from "../../services/diagnosesService";
import { Entry, Diagnosis } from "../../types"
import { useState, useEffect } from "react";

interface EntryProps {
  entry: Entry;
}

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
  return (
    <li>
      <h3>{entry.date}: {entry.description}</h3>
      <ul>
        {diagnoses.map((diagnosis) => (
          <li>{diagnosis.code}: {diagnosis.name}</li>
        ))}
      </ul>
    </li>
  )
}

export default EntryCard
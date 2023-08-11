import { Entry } from "../../types"

interface EntryProps {
  entry: Entry;
}

const EntryCard = ({ entry }: EntryProps) => {
  return (
    <li>
      <h3>{entry.date}: {entry.description}</h3>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li>{code}</li>
        ))}
      </ul>
    </li>
  )
}

export default EntryCard
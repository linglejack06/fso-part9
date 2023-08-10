import { useQuery } from "react-query";
import { getAllEntries } from "../services/entries";

function EntryList () {
  const response = useQuery('entries', getAllEntries);

  if(response.isLoading) return <div>Loading...</div>;
  const entries = response.data;
  if(!entries) {
    return <div>Error loading entries</div>
  }
  return (
    <div>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <h3>{entry.date}</h3>
            <p>Visibility: {entry.visibility}</p>
            <p>Weather: {entry.weather}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EntryList;
import { useQuery } from "react-query";
import { getAllEntries } from "../services/entries";
import { EntryProps } from "../types";

function Entry ({ date, visibility, weather }: EntryProps) {
  return (
    <li>
      <h3>{date}</h3>
      <p>Visibility: {visibility}</p>
      <p>Weather: {weather}</p>
    </li>
  )
}
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
          <Entry key={entry.id} {...entry} />
        ))}
      </ul>
    </div>
  )
}

export default EntryList;
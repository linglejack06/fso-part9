import { useMutation, useQueryClient } from "react-query";
import { createEntry } from "../services/entries";
import { useState } from "react";
import { Visibility, Weather } from "../types";

const EntryForm = () => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const client = useQueryClient();
  const newEntryMutation = useMutation(createEntry, {
    onSuccess: () => {
      client.invalidateQueries('entries');
    }
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    newEntryMutation.mutate({ date, weather, visibility, comment })
    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  }
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    switch(e.currentTarget.name) {
      case "date":
        setDate(e.currentTarget.value);
        break;
      case "comment": 
        setComment(e.currentTarget.value);
        break;
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Date:
        <input type='date' value={date} name="date" onChange={handleChange} />
      </div>
      <div>
        Weather:
        {Object.values(Weather).map((val) => (
          <div>
            <input key={val} type="radio" name={val} onChange={() => setWeather(val)} checked={weather === val} value={val}/>
            {val}
          </div>
        ))}
      </div>
      <div>
        Visibility:
        {Object.values(Visibility).map((val) => (
          <div>
            <input key={val} type="radio" name={val} onChange={() => setVisibility(val)} checked={visibility === val} value={val}/>
            {val}
          </div>
        ))}
      </div>
      <div>
        Comment:
        <input value={comment} onChange={handleChange} name="comment" />
      </div>
      <button type="submit">Add Entry</button>
    </form>
  )
}

export default EntryForm;
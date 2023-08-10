import { useMutation, useQueryClient } from "react-query";
import { createEntry } from "../services/entries";
import { useState } from "react";

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
}

export default EntryForm;
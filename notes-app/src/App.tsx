import { useEffect, useState } from 'react'
import { Note } from './types';
import { createNote, getAllNotes } from './services/noteService';

function App() {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    getAllNotes().then((notes) => setNotes(notes));
  }, [])
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const noteToAdd = {
      content: newNote,
      id: notes.length + 1,
    }
    const note = await createNote(noteToAdd);
    setNotes(notes.concat(note));
    setNewNote('');
  }
  return (
    <>
      <h1>Notes App</h1>
      <form onSubmit={handleSubmit}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type='submit'>Add note</button>
      </form>
      <ul>
        {notes.map((note) => <li key={note.id}>{note.content}</li>)}
      </ul>
    </>
  )
}

export default App

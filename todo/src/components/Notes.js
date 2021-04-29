import { useEffect, useState } from "react";

import { Note } from "./Note";

export const Notes = () => {
  const [notes, setNotes] = useState([{ message: "Hello", id: 1 }]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://notes.api/notes")
      .then((response) => response.json())
      .then((newNotes) => {
        setNotes(newNotes);
      });
  }, []);

  useEffect(() => {
    fetch("http://notes.api/notes?q=" + search)
      .then((response) => response.json())
      .then((newNotes) => {
        setNotes(newNotes);
      });
  }, [search]);

  const addNote = () => {
    const newNote = { message: "Another Note!", id: 2 };
    setNotes((existingNotes) => [...existingNotes, newNote]);
  };

  const searchNotes = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <div className="App">
      <input type="text" onChange={searchNotes} placeholder="Search"></input>
      {notes.map((note) => (
        <Note note={note} />
      ))}
      <button onClick={addNote}>Add New Note</button>
    </div>
  );
};

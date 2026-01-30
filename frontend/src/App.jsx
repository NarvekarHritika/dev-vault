import { useEffect, useState } from "react";
import "./App.css";
import NoteList from "./components/NoteList.jsx";
import NoteForm from "./components/NoteForm.jsx";

function App() {
  //notes:{
  //     "Buy groceries": "Buy chicken, eggs, flour, etc",
  //     "Dance": "Dance on Aespa Drama song",
  //     "Play a Game": "Play Ludo with friends"
  // }
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (title, description) => {
    // const formData = new FormData(e.target);
    const note = {
      title: title,
      description: description,
    };
    const response = await fetch("http://127.0.0.1:8000/add_note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error(`Failed to add note. status: ${response.status}`);
    } else {
      // 1. Update the local UI state so the new note appears instantly
      setNotes((prevNotes) => ({
        ...prevNotes,
        [title]: description,
      }));
    }

    const result = await response.json();
    console.log(result);
  };
  // 1. If loading, stop here and show the loading UI
  if (isLoading) {
    return <div className="loading">Checking your vault...</div>;
  }

  // 2. If not loading, React proceeds to this return
  return (
    <>
      <NoteForm onAddNote={handleSubmit} />
      <NoteList notes={notes} />
    </>
  );
}

export default App;

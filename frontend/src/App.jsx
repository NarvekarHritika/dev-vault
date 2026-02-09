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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (title, description) => {
    // const formData = new FormData(e.target);
    const note = { title, description };
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

  const handleDelete = async (title) => {
    const response = await fetch(
      `http://127.0.0.1:8000/delete_note?title=${title}`,
      {
        method: "DELETE",
      },
    );
    if (response.ok) {
      setNotes((prevNotes) => {
        const newNotes = { ...prevNotes };
        delete newNotes[title];
        return newNotes;
      });
    } else {
      console.error("Failed to delete note");
    }
  };
  const filteredNotes = notes
    ? Object.fromEntries(
        Object.entries(notes).filter(
          ([title, description]) =>
            // Fallback to empty string if title or searchQuery is somehow missing
            (title || "")
              .toLowerCase()
              .includes((searchQuery || "").toLowerCase()) ||
            (description || "")
              .toLowerCase()
              .includes((searchQuery || "").toLowerCase()),
        ),
      )
    : null;
  // 1. If loading, stop here and show the loading UI
  if (isLoading) {
    return <div className="loading">Checking your vault...</div>;
  }

  // 2. If not loading, React proceeds to this return
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        {/* Remove 'mx-auto' and 'text-center' */}
        <div className="max-w-2xl text-left">
          <h1 className="text-3xl font-bold mb-8 text-blue-600">Dev Vault</h1>
          <NoteForm onAddNote={handleSubmit} />
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <NoteList notes={filteredNotes} onDelete={handleDelete} />
        </div>
      </div>

      {/* <NoteForm onAddNote={handleSubmit} />
      <NoteList notes={notes} onDelete={handleDelete} /> */}
    </>
  );
}

export default App;

import { useState } from "react";
function NoteForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const localSubmit = (e) => {
    e.preventDefault();
    props.onAddNote(title, description); // Pass the values up to the parent
    setTitle(""); // Clear local state
    setDescription("");
  };
  return (
    <div>
      <h2>Add a Note</h2>
      <form onSubmit={localSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
}

export default NoteForm;

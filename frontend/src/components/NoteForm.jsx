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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold mb-4">Add a Note</h2>
      <form onSubmit={localSubmit} className="flex flex-col gap-4">
        <input
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500 outline-none"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition">
          Add Note
        </button>
      </form>
    </div>
  );
}

export default NoteForm;

// src/components/NoteList.jsx

function NoteList({ notes, onDelete }) {
  // Defensive check: if notes is null (loading state), don't render anything
  if (!notes) return null;

  return (
    <div className="grid gap-4">
      {Object.entries(notes).map(([title, description]) => (
        <div
          key={title}
          className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500 flex justify-between items-start"
        >
          {/* The container for Title and Description */}
          <div className="text-left">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>

          <button
            onClick={() => onDelete(title)}
            className="text-red-500 text-sm font-medium  hover:bg-red-50 p-2 rounded-full transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;

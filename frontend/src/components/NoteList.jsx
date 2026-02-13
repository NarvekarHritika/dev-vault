// src/components/NoteList.jsx

function NoteList({ notes, onDelete }) {
  // Defensive check: if notes is null (loading state), don't render anything
  if (!notes) return null;

  const noteEntries = Object.entries(notes);
  console.log(noteEntries);
  if (noteEntries.length === 0) {
    return <p className="text-gray-500 italic mt-4">No notes found...</p>;
  }

  return (
    <div className="grid gap-4 mt-6">
      {noteEntries.map(([title, noteData]) => {
        const description =
          typeof noteData === "string" ? noteData : noteData.description;
        const summary = typeof noteData === "object" ? noteData.summary : null;
        return (
          <div
            key={title}
            className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500 flex justify-between items-start"
          >
            {/* The container for Title and Description */}
            <div className="flex-1 text-left pr-4">
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-gray-600 mt-1">{description}</p>
              {summary && (
                <div className="mt-3 p-3 bg-blue-50 border-l-2 border-blue-300 rounded text-sm text-blue-900 italic">
                  <span className="font-bold not-italic">✨ AI Summary: </span>
                  {summary}
                </div>
              )}
            </div>
            <button
              onClick={() => onDelete(title)}
              className="text-red-500 text-sm font-medium  hover:bg-red-50 p-2 rounded-full transition"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default NoteList;

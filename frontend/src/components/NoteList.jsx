// src/components/NoteList.jsx

function NoteList({ notes, onDelete }) {
  // Defensive check: if notes is null (loading state), don't render anything
  if (!notes) return null;

  return (
    <div className="note-list">
      {Object.entries(notes).length === 0 ? (
        <p>No notes yet. Add one below!</p>
      ) : (
        Object.entries(notes).map(([title, description]) => {
          return (
            <div key={title} className="note-card">
              <h2>{title}</h2>
              <p>{description}</p>
              <button
                onClick={() => onDelete(title)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Delete
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default NoteList;

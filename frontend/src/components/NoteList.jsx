// src/components/NoteList.jsx

function NoteList({ notes }) {
  // Defensive check: if notes is null (loading state), don't render anything
  if (!notes) return null;

  return (
    <div className="note-list">
      {Object.entries(notes).map(([title, description]) => {
        return (
          <div key={title} className="note-card">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default NoteList;

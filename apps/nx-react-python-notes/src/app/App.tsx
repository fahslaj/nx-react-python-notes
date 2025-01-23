import { Plus, X } from 'lucide-react';
import React, { CSSProperties, useState } from 'react';

interface Note {
  id: string;
  content: string;
  color: string;
}

const colors = {
  yellow: '#fef9c3',
  green: '#bbf7d0',
  blue: '#bfdbfe',
  pink: '#fbcfe8',
  purple: '#e9d5ff',
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    padding: '2rem',
  },
  content: {
    maxWidth: '72rem',
    margin: '0 auto',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  inputGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    outline: 'none',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'background-color 0.2s',
  },
  notesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  },
  note: {
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    minHeight: '200px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  deleteButton: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    padding: '0.25rem',
    borderRadius: '9999px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    opacity: 0,
    transition: 'opacity 0.2s, background-color 0.2s',
  },
  noteContent: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  emptyState: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: '2rem',
  },
} as { [key: string]: CSSProperties };

export const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const colorNames = ['yellow', 'green', 'blue', 'pink', 'purple'];

  const addNote = () => {
    if (newNoteContent.trim()) {
      const newNote: Note = {
        id: crypto.randomUUID(),
        content: newNoteContent,
        color: colorNames[Math.floor(Math.random() * colorNames.length)],
      };
      setNotes([...notes, newNote]);
      setNewNoteContent('');
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div
      style={{
        ...styles.container,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Sticky Notes</h1>
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Write your note..."
              style={styles.input}
              onKeyPress={(e) => e.key === 'Enter' && addNote()}
            />
            <button
              onClick={addNote}
              style={styles.addButton}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = '#2563eb')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = '#3b82f6')
              }
            >
              <Plus size={20} />
              Add Note
            </button>
          </div>
        </div>

        <div style={styles.notesGrid}>
          {notes.map((note) => (
            <div
              key={note.id}
              style={{
                ...styles.note,
                backgroundColor: colors[note.color as keyof typeof colors],
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow =
                  '0 6px 8px rgba(0, 0, 0, 0.15)';
                const deleteButton = e.currentTarget.querySelector('button');
                if (deleteButton) {
                  deleteButton.style.opacity = '1';
                  deleteButton.style.backgroundColor =
                    'rgba(255, 255, 255, 0.5)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow =
                  '0 4px 6px rgba(0, 0, 0, 0.1)';
                const deleteButton = e.currentTarget.querySelector('button');
                if (deleteButton) {
                  deleteButton.style.opacity = '0';
                  deleteButton.style.backgroundColor = 'transparent';
                }
              }}
            >
              <button
                onClick={() => deleteNote(note.id)}
                style={styles.deleteButton}
              >
                <X size={20} />
              </button>
              <p style={styles.noteContent}>{note.content}</p>
            </div>
          ))}
        </div>

        {notes.length === 0 && (
          <div style={styles.emptyState}>
            <p>No notes yet! Add your first note above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

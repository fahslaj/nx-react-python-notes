import { Note, NoteModel } from '@nx-react-python-notes/note';
import { styles } from '@nx-react-python-notes/ui-shared';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:4201/api/notes';

export const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const colorNames = ['yellow', 'green', 'blue', 'pink', 'purple'];

  useEffect(() => {
    const fetchNotes = async () => {
      // try {
      //   const response = await fetch(API_URL);
      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }
      //   const data = await response.json();
      //   setNotes(data);
      // } catch (err) {
      //   console.error('Error fetching notes:', err);
      // }
    };

    fetchNotes();
  }, []);

  const addNote = async () => {
    if (newNoteContent.trim()) {
      const newNote: Partial<NoteModel> = {
        content: newNoteContent,
        color: colorNames[Math.floor(Math.random() * colorNames.length)],
      };
      // try {
      //   const response = await fetch(API_URL, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(newNote),
      //   });

      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }

      //   const createdNote: NoteModel = await response.json();
      //   setNotes([...notes, createdNote]);
      //   setNewNoteContent('');
      // } catch (err) {
      //   console.error('Error creating note:', err);
      // }
      setNotes([...notes, { id: notes.length, ...(newNote as NoteModel) }]);
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
            <Note key={note.id} note={note} onDelete={deleteNote} />
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

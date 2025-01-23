import { colors, styles } from '@nx-react-python-notes/ui-shared';
import { X } from 'lucide-react';

export interface NoteModel {
  id: string;
  content: string;
  color: string;
}

interface NoteProps {
  note: NoteModel;
  onDelete: (id: string) => void;
}

export function Note({ note, onDelete }: NoteProps) {
  return (
    <div
      style={{
        ...styles.note,
        backgroundColor: colors[note.color as keyof typeof colors],
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
        const deleteButton = e.currentTarget.querySelector('button');
        if (deleteButton) {
          deleteButton.style.opacity = '1';
          deleteButton.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        }
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        const deleteButton = e.currentTarget.querySelector('button');
        if (deleteButton) {
          deleteButton.style.opacity = '0';
          deleteButton.style.backgroundColor = 'transparent';
        }
      }}
    >
      <button onClick={() => onDelete(note.id)} style={styles.deleteButton}>
        <X size={20} />
      </button>
      <p style={styles.noteContent}>{note.content}</p>
    </div>
  );
}

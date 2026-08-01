import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes?: Note[];
}

export default function NoteList({ notes = [] }: NoteListProps) {
  const safeNotes = Array.isArray(notes) ? notes : [];

  if (safeNotes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <ul className={css.list}>
      {safeNotes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  );
}
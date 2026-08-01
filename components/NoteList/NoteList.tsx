import Link from 'next/link';
import css from './NoteList.module.css';


interface Note {
  id: string;
  title: string;
  content?: string;
  tag?: string;
}

interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.card}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          
          <div className={css.footer}>
            {note.tag && <span className={css.tag}>{note.tag}</span>}
            
            <div className={css.actions}>
              <Link href={`/notes/${note.id}`} className={css.viewBtn}>
                View details
              </Link>
              
              <button 
                type="button" 
                className={css.deleteBtn}
                onClick={() => onDelete?.(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
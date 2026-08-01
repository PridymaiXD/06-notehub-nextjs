'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css'; 

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading note details...</p>;
  if (isError || !note) return <p>Failed to load note.</p>;

  return (
    <div className={css.container}>
      <div className={css.card}>
        <h1 className={css.title}>{note.title}</h1>
        
        {note.tag && <span className={css.tag}>{note.tag}</span>}
        
        <p className={css.content}>{note.content}</p>
        
        {note.createdAt && (
          <span className={css.date}>{note.createdAt}</span>
        )}
      </div>
    </div>
  );
}
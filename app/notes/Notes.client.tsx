'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './Notes.module.css'; 

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [debouncedSearch] = useDebounce(search, 300);


  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes(page, debouncedSearch),
  });
  return (
    <div className={css.container}>
      <div className={css.topBar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <button 
          className={css.createBtn} 
          onClick={() => setIsModalOpen(true)}
        >
          Create Note
        </button>
      </div>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes!</p>}

      {data && (
        <>
<NoteList notes={Array.isArray(data) ? data : data?.notes} />
          {data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              pageCount={data.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
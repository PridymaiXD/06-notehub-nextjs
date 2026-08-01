import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNote } from '@/lib/api';
import { CreateNotePayload } from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required('Required'),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'])
    .required('Required'),
});

const initialValues: CreateNotePayload = {
  title: '',
  content: '',
  tag: 'Work',
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = (values: CreateNotePayload) => {
    mutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.fieldGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" type="text" />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor="content">Content</label>
          <Field id="content" name="content" as="textarea" />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor="tag">Tag</label>
          <Field id="tag" name="tag" as="select">
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
            <option value="Todo">Todo</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelBtn}>
            Cancel
          </button>
          
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating...' : 'Create Note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
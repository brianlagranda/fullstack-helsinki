import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../request';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const onCreate = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length < 5) {
      alert('Anecdote content must be at least 5 characters long.');
      return;
    }

    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

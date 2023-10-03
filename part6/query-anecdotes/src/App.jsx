import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './request';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import { useNotificationDispatch } from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const handleVote = anecdote => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `Anecdote '${anecdote.content}' voted`,
    });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
  };

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    console.error(`Error: ${error.message}`);
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

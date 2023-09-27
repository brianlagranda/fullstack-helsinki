import { useQuery } from '@tanstack/react-query';
import { getAnecdotes } from './request';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });

  const handleVote = anecdote => {
    console.log('vote');
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

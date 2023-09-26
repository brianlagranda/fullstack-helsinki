import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li className='py-2 my-3 px-2 rounded bg-sky-300/20 shadow-lg shadow-black-500/50'>
      {anecdote.content}
      <div className='px-2'>
        Has {anecdote.votes}
        <button
          className='bg-sky-300 px-2 rounded h-7 mx-2 border hover:border-slate-100'
          onClick={handleClick}
        >
          vote
        </button>
      </div>
    </li>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const anecdotesForSort = [...anecdotes];
    const sortedAnecdotes = anecdotesForSort.sort((a, b) => b.votes - a.votes);
    if (filter === '') {
      return sortedAnecdotes;
    } else {
      return sortedAnecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter)
      );
    }
  });

  return (
    <ul className='my-4 px-2'>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(addVote(anecdote.id));
            dispatch(setNotification(`You voted '${anecdote.content}'`));
            setTimeout(() => {
              dispatch(setNotification(''));
            }, 5000);
          }}
        />
      ))}
    </ul>
  );
};

export default AnecdoteList;

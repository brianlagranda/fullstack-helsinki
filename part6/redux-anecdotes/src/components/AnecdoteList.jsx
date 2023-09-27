import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { updateAnecdoteVotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

import Anecdote from './Anecdote';

const selectFilteredAnecdotes = createSelector(
  state => state.anecdotes,
  state => state.filter,
  (anecdotes, filter) => {
    const anecdotesForSort = [...anecdotes];
    const sortedAnecdotes = anecdotesForSort.sort((a, b) => b.votes - a.votes);
    if (filter === '') {
      return sortedAnecdotes;
    } else {
      return sortedAnecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter)
      );
    }
  }
);

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(state => selectFilteredAnecdotes(state));

  return (
    <ul className='my-4 px-2'>
      {anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(updateAnecdoteVotes(anecdote));
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


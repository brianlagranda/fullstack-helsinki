import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { updateAnecdoteVotes } from '../reducers/anecdoteReducer';
import { setNotificationThunk } from '../reducers/notificationReducer';

import Anecdote from './Anecdote';

const selectFilteredAnecdotes = createSelector(
  state => state.anecdotes,
  state => state.filter,
  (anecdotes, filter) => {
    const anecdotesForSort = [...anecdotes];
    const sortedAnecdotes = anecdotesForSort.sort((a, b) => b.votes - a.votes);
    return sortedAnecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter)
    );
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
            dispatch(
              setNotificationThunk(`You voted '${anecdote.content}'`, 5)
            );
          }}
        />
      ))}
    </ul>
  );
};

export default AnecdoteList;


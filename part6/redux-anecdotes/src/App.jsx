import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

import anecdoteService from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div
      id='root'
      className=' bg-gradient-to-br from-sky-100/40 to-sky-200/50 font-roboto h-full min-h-screen px-4 py-4 sm:w-3/4 sm:mx-auto sm:my-10 lg:w-2/4 rounded-lg sm:shadow-lg sm:shadow-black-500/50 lg:min-h-fit'
    >
      <h2 className='text-center text-sky-500 text-xl'>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2 className='text-center text-sky-500 text-xl'>Create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;


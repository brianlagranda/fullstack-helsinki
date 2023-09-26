import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    if (content !== '' && content.length >= 5) {
      dispatch(createAnecdote(content));
      dispatch(setNotification(`'${content}' has been created successfully`));
    } else {
      dispatch(
        setNotification(
          `The content was not defined or is less than 5 characters in length`
        )
      );
    }
    setTimeout(() => {
      dispatch(setNotification(''));
    }, 5000);
  };

  return (
    <form className='py-4 flex gap-4' onSubmit={addAnecdote}>
      <input className='w-full h-7 my-auto px-2 rounded' name='anecdote' />
      <button
        className='bg-sky-300 px-4 rounded h-8 border hover:border-slate-100'
        type='submit'
      >
        create
      </button>
    </form>
  );
};

export default AnecdoteForm;


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

export default Anecdote;

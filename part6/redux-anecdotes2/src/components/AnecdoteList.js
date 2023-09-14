import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
        {anecdote.content} 
        <div> 
        Has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
        </div>
    </li>
  )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) => {
    const anecdotesForSort = [...anecdotes];
    const sortedAnecdotes = anecdotesForSort.sort((a, b) => b.votes - a.votes)
    if ( filter === '' ) {
      return sortedAnecdotes
    } else {
      return sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    }
  })

  return(
    <ul className='bg-black'>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            dispatch(addVote(anecdote.id))
          }
        />
      )}
    </ul>
  )
}

export default AnecdoteList
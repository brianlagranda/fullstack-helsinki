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
  const anecdotes = useSelector(state => state)

  return(
    <ul>
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
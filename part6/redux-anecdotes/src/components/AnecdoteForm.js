import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  const style = {
    display: "block",
    marginTop: 5
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button style={style} type="submit">Create</button>
    </form>
  )
}

export default AnecdoteForm;
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <form className='py-4 flex gap-4' onSubmit={addAnecdote}>
      <input className='w-full h-7 my-auto px-2 rounded' name="anecdote" />
      <button className='bg-sky-300 px-4 rounded h-8 border hover:border-slate-100' type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm;
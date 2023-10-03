import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data);

export const createAnecdote = async newAnecdote => {
  if (newAnecdote.content.length < 5) {
    throw new Error('Anecdote content must be at least 5 characters long');
  }
  const response = await axios.post(baseUrl, newAnecdote).then(res => res.data);

  return response;
};

export const updateAnecdote = async updatedAnecdote =>
  await axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then(res => res.data);


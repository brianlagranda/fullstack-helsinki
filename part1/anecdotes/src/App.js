import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ anecdotes, selected, votes }) => {
  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
    </>
  );
};

const AnecdoteMostVoted = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes);
  const mostVotedIndex = votes.indexOf(maxVotes);

  if (maxVotes === 0) {
    return (
      <>
        <h2>Anecdote with most votes</h2>
        <p>No votes yet</p>
      </>
    );
  }

  return (
    <>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[mostVotedIndex]}</div>
      <div>has {maxVotes} votes</div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const getRandomAnecdote = () => {
    const randomIndex = getRandomInt(anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  return (
    <div>
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={getRandomAnecdote} text="next anecdote" />
      <AnecdoteMostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;

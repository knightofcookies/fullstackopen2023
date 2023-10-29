import { useState } from 'react'

type ButtonProps = {
  text: string;
  handleClick: () => void;
};

const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  );
};

type QuoteProps = {
  text: string;
};

const Quote = (props: QuoteProps) => {
  return (
    <p>{props.text}</p>
  )
};

type VoteProps = {
  votes: number;
  handleClick: () => void;
};

const Vote = (props: VoteProps) => {
  return (
    <div>
      <p>has {props.votes} votes</p>
      <Button text='Vote' handleClick={props.handleClick} />
    </div>
  );
};

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const tempVotes = new Array(anecdotes.length);
  tempVotes.fill(0);

  const [votes, setVotes] = useState(tempVotes);

  const [selected, setSelected] = useState(0);

  const findMostVoted = () => {
    let maxi = 0;
    for(let i = 0; i < votes.length; i++) {
      if(votes[i] > votes[maxi]) {
        maxi = i;
      }
    }
    return maxi;
  };

  const mostVoted = findMostVoted();

  const nextQuote = () => {
    if (selected == anecdotes.length - 1) {
      setSelected(0);
    }
    else {
      setSelected(selected + 1);
    }
  };

  const vote = (index: number) => {
    const newVotes = [...votes];
    newVotes[index] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Quote text={anecdotes[selected]} />
      <Vote votes={votes[selected]} handleClick={() => vote(selected)} />
      <Button text='Next Quote' handleClick={nextQuote} />
      <h1>Anecdote with most votes</h1>
      <Quote text={anecdotes[mostVoted]} />
      <Vote votes={votes[mostVoted]} handleClick={() => vote(mostVoted)} />
    </div>
  );
};

export default App;

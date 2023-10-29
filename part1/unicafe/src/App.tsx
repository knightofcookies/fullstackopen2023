import { useState } from 'react'

type ButtonProps = {
  text: string;
  handleClick: () => void;
};

function Button(props: ButtonProps) {
  return <button onClick={props.handleClick}>{props.text}</button>
}

type TitleProps = {
  text: string;
};

function Title(props: TitleProps) {
  return (<h1>{props.text}</h1>);
}

type StatisticsLineProps = {
  title: string;
  value: string;
};

function StatisticsLine({ title, value }: StatisticsLineProps) {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  );
}

type StatisticsProps = {
  goodValue: number;
  neutralValue: number;
  badValue: number;
};

function Statistics(props: StatisticsProps) {
  const totalCount = props.goodValue + props.badValue + props.neutralValue;
  if (totalCount === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given.</p>
      </div>
    );
  }
  const average = (props.goodValue - props.badValue) / (totalCount);
  const positivePercentage = 100 * (props.goodValue) / (totalCount);
  return (
    <div>
      <h2>Statistics</h2>
      <StatisticsLine title="Good" value={props.goodValue.toString()} />
      <StatisticsLine title="Neutral" value={props.neutralValue.toString()} />
      <StatisticsLine title="Bad" value={props.badValue.toString()} />
      <StatisticsLine title="All" value={totalCount.toString()} />
      <StatisticsLine title="Average" value={average.toString()} />
      <StatisticsLine title="Positive percentage" value={positivePercentage.toString() + "%"} />
    </div>
  );
}

type FeedbackProps = {
  buttonprops: ButtonProps[];
};

function Feedback({ buttonprops }: FeedbackProps) {
  return (
    <div>
      <Button text={buttonprops[0].text} handleClick={buttonprops[0].handleClick} />
      <Button text={buttonprops[1].text} handleClick={buttonprops[1].handleClick} />
      <Button text={buttonprops[2].text} handleClick={buttonprops[2].handleClick} />
    </div>
  );
}

function App() {

  const [goodValue, setGoodValue] = useState(0);
  const [neutralValue, setNeutralValue] = useState(0);
  const [badValue, setBadValue] = useState(0);

  const incrementGood = () => {
    setGoodValue(goodValue + 1);
  };

  const incrementNeutral = () => {
    setNeutralValue(neutralValue + 1);
  };

  const incrementBad = () => {
    setBadValue(badValue + 1);
  };

  const buttonprops: FeedbackProps["buttonprops"] = [
    {
      text: "Good",
      handleClick: incrementGood
    },
    {
      text: "Neutral",
      handleClick: incrementNeutral
    },
    {
      text: "Bad",
      handleClick: incrementBad
    },
  ];

  return (
    <div>
      <Title text="Give Feedback" />
      <Feedback buttonprops={buttonprops} />
      <Statistics goodValue={goodValue} neutralValue={neutralValue} badValue={badValue} />
    </div>
  );
}

export default App;

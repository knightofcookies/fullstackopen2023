type HeaderProps = {
  course : string;
};

const Header = (props : HeaderProps) => {
  return (
    <h1>
      {props.course}
    </h1>
  );
};


type PartProps = {
  id: number;
  part: string;
  exercises: number;
};

type ContentProps = {
  parts: PartProps[];
};

const Part = (props : PartProps) => {
  return (
    <p key="props.id">{props.part} {props.exercises}</p>
  );
};

const Content = (props: ContentProps) => {
  return (
    <div>
      <Part id={props.parts[0].id} part={props.parts[0].part} exercises={props.parts[0].exercises}/>
      <Part id={props.parts[1].id} part={props.parts[1].part} exercises={props.parts[1].exercises}/>
      <Part id={props.parts[2].id} part={props.parts[2].part} exercises={props.parts[2].exercises}/>
    </div>
  );
};

type TotalProps = {
  values: number[];
};

const Total = (props : TotalProps) => {
  let totalCount = 0;
  props.values.map((count) => {
    totalCount += count;
  }); 
  return (
    <p>Number of exercises {totalCount}</p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1: PartProps = {
    id: 1,
    part: 'Fundamentals of React',
    exercises: 10
  };
  const part2: PartProps = {
    id: 2,
    part: 'Using props to pass data',
    exercises: 7
  };
  const part3: PartProps = {
    id: 3,
    part: 'State of a component',
    exercises: 14
  };
  const parts: ContentProps["parts"] = [part1, part2, part3];
  const values: TotalProps["values"] = [part1.exercises, part2.exercises, part3.exercises];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total values={values}/>
    </div>
  );
};

export default App;
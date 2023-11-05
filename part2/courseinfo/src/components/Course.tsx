type HeaderProps = {
    name: string;
};

const Header = (props: HeaderProps) => {
    return (
        <h1>
            {props.name}
        </h1>
    );
};


type PartProps = {
    id: number;
    name: string;
    exercises: number;
};

type ContentProps = {
    parts: PartProps[];
};

const Part = (props: PartProps) => {
    return (
        <p>{props.name} {props.exercises}</p>
    );
};

const Content = (props: ContentProps) => {
    const exercises: number[] = props.parts.map((part) => part.exercises);
    return (
        <div>
            {props.parts.map((part) => <Part key={part.id} id={part.id} name={part.name} exercises={part.exercises} />)}
            <Total exercises={exercises} />
        </div>
    );
};

type TotalProps = {
    exercises: number[];
};

const Total = (props: TotalProps) => {
    let totalCount = 0;
    totalCount = props.exercises.reduce((accumulator, currentValue) => accumulator + currentValue, totalCount);
    return (
        <p>Number of exercises {totalCount}</p>
    );
};

type CourseProps = {
    id: number;
    name: string;
    parts: PartProps[];
};

const Course = (props: CourseProps) => {
    return (
        <div key={props.id}>
            <Header name={props.name} />
            <Content parts={props.parts} />
        </div>
    );
};

export default Course;
export type { CourseProps };
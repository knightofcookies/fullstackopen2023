type PersonObject = {
    name: string;
    phone: string;
};

type PersonsProps = {
    searchResults: PersonObject[]; 
};

const Persons = (props: PersonsProps) => {
    return (
        <div>
            {props.searchResults.map((person) => <p key={person.name}>{person.name} {person.phone}</p>)}
        </div>
    );
};

export default Persons;
export type { PersonObject, PersonsProps };
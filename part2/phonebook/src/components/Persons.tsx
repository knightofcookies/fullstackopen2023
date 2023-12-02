type PersonObject = {
    name: string;
    phone: string;
    id: number;
};

type PersonsProps = {
    searchResults: PersonObject[];
    deletePerson: (id: number) => void; 
};

const Persons = (props: PersonsProps) => {
    return (
        <div>
            {props.searchResults.map((person) => <div><p key={person.id}>{person.name} {person.phone}</p><button onClick={(event: React.MouseEvent<HTMLButtonElement>) => props.deletePerson(person.id)}>Delete</button></div>)}
        </div>
    );
};

export default Persons;
export type { PersonObject, PersonsProps };
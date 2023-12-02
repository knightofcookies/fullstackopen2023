type PersonObject = {
    name: string;
    phone: string;
    id: number;
};

type PersonsProps = {
    searchResults: PersonObject[];
    deletePerson: (id: number, name: string) => void; 
};

const Persons = (props: PersonsProps) => {
    return (
        <div>
            {props.searchResults.map((person) => <div key={person.id}><p>{person.name} {person.phone}</p><button onClick={(event: React.MouseEvent<HTMLButtonElement>) => props.deletePerson(person.id, person.name)}>Delete</button></div>)}
        </div>
    );
};

export default Persons;
export type { PersonObject, PersonsProps };
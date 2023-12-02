import { ChangeEvent, useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons, { PersonObject } from './components/Persons';
import personService from './services/person';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'John Doe', phone: '007', id: 1}
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameQuery, setNameQuery] = useState('');
  const [searchResults, setSearchResults] = useState(persons);

  useEffect(() => {
    personService.getAllPersons()
    .then(response => {
      const persons = response.data;
      setPersons(persons);
      setSearchResults(persons);
    })
  }, []);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value);
  };

  const handleNameQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameQuery(event.target.value);
  };

  const displayResults = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (nameQuery === '')
      setSearchResults(persons);
    else
      setSearchResults(persons.filter(person => person.name.includes(nameQuery)));
  };

  const addPerson = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      phone: newNumber,
    };
    const existingPerson = persons.find((person) => person.name === newName);
    if(newName === '' || newNumber === '') {
      alert("Field(s) cannot be empty");
      return;
    }
    else if (existingPerson != undefined) {
      if(confirm(`${newName} is already in the phonebook, replace the old number with the new one?`)) {
        const id = existingPerson.id;
        const updatedPerson: PersonObject = {...existingPerson, phone: newNumber};
        personService
          .updatePerson(id, updatedPerson)
          .then(response => {
            const responsePerson: PersonObject = response.data;
            setPersons(persons.map(person => (person.id !== responsePerson.id) ? person : responsePerson));
            setSearchResults(persons.map(person => (person.id !== responsePerson.id) ? person : responsePerson));
            setNewName('');
            setNewNumber('');
            setNameQuery('');    
          })
          .catch(error => alert(error));
      }
      return;
    }
    else {
      personService
        .createPerson(personObject)
        .then(response => {
          const newPerson = response.data;
          setPersons(persons.concat(newPerson));
          setSearchResults(persons.concat(newPerson));
          setNewName('');
          setNewNumber('');
          setNameQuery('');  
        })
        .catch(error => {
          alert(error);
        });  
    }
  };

  const deletePerson = (id: number, name: string) => {
    if(!confirm(`Delete ${name}?`))
      return;
    personService.deletePerson(id).then(response => {
      console.log(response.status);
      setPersons(persons.filter(person => person.id !== id));
      setSearchResults(persons.filter(person => person.id !== id));
      setNameQuery('');
      setNewName('');
      setNewNumber('');
    }).catch(error => { 
      alert(error);
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <Filter nameQuery={nameQuery} handleNameQueryChange={handleNameQueryChange} displayResults={displayResults} />
      <h2>Add a new contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Contacts</h2>
      <Persons searchResults={searchResults} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;
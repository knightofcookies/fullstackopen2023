import { ChangeEvent, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: 9876543210 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState(0);
  const [nameQuery, setNameQuery] = useState('');
  const [searchResults, setSearchResults] = useState(persons);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNumber(Number.parseInt(event.target.value));
  };

  const handleNameQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameQuery(event.target.value);
  };

  const displayResults = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if(nameQuery === '')
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
    if(persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook!`);
    }
    else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber(0);
    }
  };


  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <Filter nameQuery={nameQuery} handleNameQueryChange={handleNameQueryChange} displayResults={displayResults}/>
      <h2>Add a new contact</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Contacts</h2>
      <Persons searchResults={searchResults}/>
    </div>
  );
};

export default App;
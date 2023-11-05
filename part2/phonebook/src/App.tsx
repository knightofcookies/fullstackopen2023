import { ChangeEvent, useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const addName = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
    };
    if(persons.filter((person) => person.name === newName).length !== 0) {
      console.log(newName)
      console.log(persons);
      console.log(persons.filter((person) => person.name === newName));
      
      alert(`${newName} is already in the phonebook!`);
    }
    else {
      setPersons(persons.concat(nameObject));
      setNewName('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  );
};

export default App;
import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const addPhoneNumber = (e) => {
    e.preventDefault();

    const isContact = persons.find((person) => person.name === newName);

    if (isContact) {
      const confirmation = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmation) {
        const updatedPerson = { ...isContact, number: newNumber };

        personService
          .update(isContact.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const numbersToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const deleteContact = (id, name) => {
    const confirmation = window.confirm(`Delete ${name}?`);

    if (confirmation) {
      personService.deleteContact(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPhoneNumber={addPhoneNumber}
      />
      <h3>Numbers</h3>
      <Persons numbersToShow={numbersToShow} deleteContact={deleteContact} />
    </div>
  );
};

export default App;

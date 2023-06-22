const Persons = ({ numbersToShow, deleteContact }) => {
  return (
    <>
      {numbersToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => deleteContact(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Persons;

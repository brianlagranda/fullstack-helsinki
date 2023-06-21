const Persons = ({ numbersToShow }) => {
  return (
    <>
      {numbersToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};

export default Persons;

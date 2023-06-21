const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handlePhoneChange,
  addPhoneNumber,
}) => {
  return (
    <form onSubmit={addPhoneNumber}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;

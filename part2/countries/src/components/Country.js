const Country = ({ selectedCountry }) => {
  return (
    <div>
      <div key={selectedCountry.name.common}>
        <h2>{selectedCountry.name.common}</h2>

        <div>capital {selectedCountry.capital}</div>
        <div>area {selectedCountry.area}</div>

        <h3>languages</h3>
        <ul>
          {Object.values(selectedCountry.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>

        <img
          src={selectedCountry.flags.png}
          alt={selectedCountry.name.common}
        />
      </div>
    </div>
  );
};

export default Country;

const Countries = ({ countries }) => {
  if (countries.length === 0)
    return <div>Too many matches, specify another filter</div>;

  if (countries.length === 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>

            <div>capital {country.capital}</div>
            <div>area {country.area}</div>

            <h3>languages</h3>
            <ul>
              {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>

            <img src={country.flags.png} alt={country.name.common} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <h2>Countries: </h2>
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    </>
  );
};

export default Countries;

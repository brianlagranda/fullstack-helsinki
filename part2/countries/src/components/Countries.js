import { useState } from "react";
import Country from "./Country";
import CapitalWeather from "./CapitalWeather";

const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (country) => {
    if (country === selectedCountry) {
      setSelectedCountry(null);
    } else {
      setSelectedCountry(country);
    }
  };

  if (countries.length === 0 || countries.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (countries.length === 1) {
    const selectedCountry = countries[0];
    const capital = selectedCountry.capital[0];
    const countryCode = selectedCountry.cca2;

    return (
      <div>
        <Country selectedCountry={selectedCountry} />
        <CapitalWeather capital={capital} countryCode={countryCode} />
      </div>
    );
  }

  if (selectedCountry) {
    return (
      <>
        <h2>Countries:</h2>
        <ul>
          {countries.map((country) => (
            <li key={country.name.common}>
              {country === selectedCountry ? (
                <Country selectedCountry={selectedCountry} />
              ) : (
                <>
                  {country.name.common}{" "}
                  <button onClick={() => handleCountryClick(country)}>
                    show
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <h2>Countries:</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => handleCountryClick(country)}>show</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Countries;

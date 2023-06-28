import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import countriesService from "./services/countries";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesService
      .getAll()
      .then((initialCountries) => {
        setCountries(initialCountries);
      })
      .catch((error) => {
        console.error("Error obtaining countries: ", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const countriesToShow = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;

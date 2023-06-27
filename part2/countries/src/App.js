import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import Countries from "./components/Countries";
import countriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countriesService
      .getAll()
      .then((response) => {
        setCountries(response);
      })
      .catch((error) => {
        console.error("Error to obtain countries: ", error);
      });
  }, []);

  const handleFilterChange = (e) => {
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

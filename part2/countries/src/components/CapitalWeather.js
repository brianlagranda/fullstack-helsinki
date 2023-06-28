import React, { useEffect, useState } from "react";
import weatherService from "../services/weather";

const CapitalWeather = ({ capital, countryCode }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iconID, setIconID] = useState("");

  useEffect(() => {
    weatherService
      .getWeatherByCapital(capital, countryCode)
      .then((initialWeather) => {
        setWeatherData(initialWeather);
        const newIconID = initialWeather.weather[0].icon;
        setIconID(newIconID);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error obtaining weather info: ", error);
      });
  }, [capital, countryCode]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${iconID}@2x.png`;

  return (
    <div>
      {weatherData && (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p>temperature {weatherData.main.temp} Celsius</p>
          <img src={iconUrl} alt="Weather Icon" />
          <p>wind {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CapitalWeather;

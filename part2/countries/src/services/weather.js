import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const getWeatherByCapital = (capital, countryCode) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital},${countryCode}&APPID=${api_key}&units=metric`;
  return axios.get(url).then((response) => response.data);
};

export default { getWeatherByCapital };

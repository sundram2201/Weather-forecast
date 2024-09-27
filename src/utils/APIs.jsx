import axios from "axios";

const APP_ID = import.meta.env.VITE_APP_ID;
const BASE_URL = import.meta.env.VITE_OPEN_WEATHER_URL;
const RAPID_KEY = import.meta.env.VITE_RAPID_KEY;
const RAPID_HOST = import.meta.env.VITE_RAPID_HOST;

const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${RAPID_KEY}`,
    "X-RapidAPI-Host": `${RAPID_HOST}`,
  },
};

export const FetchWeatherAPI = async (setWeatherData, { lat, lon }) => {
  
  try {
    const weatherResponse = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=metric`
    );

    const forecastResponse = await axios.get(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=metric`
    );

    setWeatherData({
      weather: weatherResponse.data,
      forecast: forecastResponse.data,
    });
  } catch (err) {
    alert("Location not found or API error");
  }
};

export const FetchCitiesAPI = async (input) => {
  try {
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

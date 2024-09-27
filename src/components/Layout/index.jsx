import React, { useEffect, useState, useRef } from "react";
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import TodayForecast from "./TodayForecast";
import WeeklyForecast from "./WeeklyForecast";
import { WeatherContext } from "../Context";
import { FetchCitiesAPI, FetchWeatherAPI } from "../../utils/APIs";
import Loader from "../Reusable/Loader";
import "./styles.css";

const Index = () => {
  const [searchValue, setSearchValue] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(false);
  const [isCelcius, setIsCelcius] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const containerRef = useRef(null);

  const fetchCities = async (input) => {
    const response = await FetchCitiesAPI(input);
    return response;
  };

  const handleFetchCities = async (inputValue) => {
    setIsLoading(true);
    try {
      const response = await fetchCities(inputValue);
      setCities(
        response?.data?.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        }))
      );
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const searchDebounced = setTimeout(async () => {
      if (searchValue.length > 2) {
        await handleFetchCities(searchValue);
      } else {
        setCities([]);
      }
    }, 600);

    return () => clearTimeout(searchDebounced);
  }, [searchValue]);

  const handleCityClick = (city) => {
    const coords = city.value.split(" ");
    const getLongLat = { lat: coords[0], lon: coords[1] };
    setSearchValue(`${city.label}`);
    fetchWeather(getLongLat);
    setCities([]);
  };

  const fetchWeather = async ({ lat, lon }) => {
    const response = await FetchWeatherAPI(setWeatherData, { lat, lon });
    return response;
  };

  const handlePullToRefresh = async () => {
    setRefreshing(true);
    const DefCoords = { lat: 40.71, lon: -74.0 }; // New York
    await fetchWeather(DefCoords);
    setRefreshing(false);
  };

  const handleTouchStart = (e) => {
    if (containerRef.current.scrollTop === 0) {
      containerRef.current.touchY = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (containerRef.current.scrollTop === 0) {
      const touchY = e.touches[0].clientY;
      const pullDistance = touchY - containerRef.current.touchY;

      if (pullDistance > 60) {
        handlePullToRefresh();
        containerRef.current.touchY = touchY; // Update touchY to the new position
      }
    }
  };

  useEffect(() => {
    const DefCoords = { lat: 40.71, lon: -74.0 };
    fetchWeather(DefCoords); // New York
  }, []);

  const CelciusToFerenheit = () => (
    <label
      className="switch mt-3 position-absolute"
      style={{ top: "1%", left: "3%" }}
    >
      <span>Switch Temperature</span>
      <input
        className="cb"
        type="checkbox"
        value={isCelcius}
        onClick={() => setIsCelcius(!isCelcius)}
      />
      <span className="CF-btn">{isCelcius ? "C" : "F"}</span>
    </label>
  );

  return (
    <WeatherContext.Provider
      value={{
        isLoading,
        isCelcius,
        searchValue,
        weatherData,
        cities,
        setSearchValue,
        handleCityClick,
      }}
    >
      {weatherData ? (
        <div
          className="w-100 forecast-layout position-relative"
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          style={{ overflowY: "auto", height: "100vh" }}
        >
          {refreshing && <div className="loader">Refreshing...</div>}
          <CelciusToFerenheit />
          <Search />
          <CurrentWeather />
          <TodayForecast />
          <WeeklyForecast />
        </div>
      ) : (
        <Loader />
      )}
    </WeatherContext.Provider>
  );
};

export default Index;

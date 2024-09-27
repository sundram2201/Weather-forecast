import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { WeatherContext } from "../../Context";
import { WeatherIcon } from "../../Reusable/WeatherIcon";
import CelciusConvert from "../../Reusable/CelciusConvert";

const FiveDayForecast = () => {
  const { weatherData, isCelcius } = useContext(WeatherContext);
  const forecastData = weatherData?.forecast;
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  const groupByDay = () => {
    const forecastByDay = {};

    forecastData?.list?.forEach((entry) => {
      const date = moment.unix(entry.dt).format("YYYY-MM-DD");

      if (!forecastByDay[date]) {
        forecastByDay[date] = [];
      }
      forecastByDay[date].push(entry);
    });

    const groupedData = Object.keys(forecastByDay).map((date) => {
      const dailyData = forecastByDay[date];

      const avgTemp =
        dailyData.reduce((total, entry) => total + entry.main.temp, 0) /
        dailyData.length;

      const weatherCondition = dailyData[0].weather[0].description;
      const weatherIcon = dailyData[0].weather[0].icon;

      return {
        date,
        avgTemp,
        weatherCondition,
        weatherIcon,
      };
    });

    setFiveDayForecast(groupedData.slice(0, 5));
  };

  useEffect(() => {
    if (forecastData?.list?.length > 0) {
      groupByDay();
    }
  }, [forecastData]);

  return (
    <div className="five-day-forecast">
      <h2 className="text-center mb-4">5-Day Forecast</h2>
      <div className="forecast-container ">
        {fiveDayForecast.map((dayForecast, index) => {
          const weekForetemp = Math.floor(
            isCelcius
              ? dayForecast.avgTemp
              : CelciusConvert(dayForecast.avgTemp)
          );

          return (
            <div
              key={index}
              className="t-fore-container my-3 py-3 day-forecast d-flex justify-content-evenly align-items-center"
            >
              <p>{moment(dayForecast.date).format("dddd, MMM D")}</p>
              <div className="">
                <p>{dayForecast.weatherCondition}</p>
                <p>
                  Avg Temp: {weekForetemp} {isCelcius ? "°C" : "°F"}
                </p>
              </div>
              <WeatherIcon icon={dayForecast.weatherIcon} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FiveDayForecast;

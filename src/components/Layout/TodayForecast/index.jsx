import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../Context";
import moment from "moment";
import { WeatherIcon } from "../../Reusable/WeatherIcon";
import CelciusConvert from "../../Reusable/CelciusConvert";

const index = () => {
  const [todayForecast, setTodayForecast] = useState([]);

  const { weatherData, isCelcius } = useContext(WeatherContext);
  const forecastData = weatherData?.forecast?.list;

  const filterTodayForecast = () => {
    const today = moment().format("YYYY-MM-DD");

    const filterTodayForecast = forecastData.filter((entry) => {
      const forecastDate = moment.unix(entry.dt).format("YYYY-MM-DD");
      return forecastDate === today;
    });
    setTodayForecast(filterTodayForecast);
  };

  useEffect(() => {
    if (forecastData?.length > 0) {
      filterTodayForecast();
    }
  }, [forecastData]);

  return (
    <>
      <h2 className="text-center mb-4">Today's Forecast</h2>
      <div className="d-flex justify-content-evenly">
        {todayForecast.length > 0 ? (
          todayForecast.map((forecast, index) => {
            const foreTemp = Math.floor(
              isCelcius
                ? forecast.main.temp
                : CelciusConvert(forecast.main.temp)
            );

            return (
              <div key={index} className="py-2 px-4 t-fore-container">
                <p>{moment.unix(forecast.dt).format("HH:mm")}</p>
                <p>
                  <WeatherIcon icon={forecast.weather[0].icon} />
                </p>
                <p>
                  {foreTemp} {isCelcius ? "°C" : "°F"}
                </p>
              </div>
            );
          })
        ) : (
          <p>No data available for today.</p>
        )}
      </div>
      <hr />
    </>
  );
};

export default index;

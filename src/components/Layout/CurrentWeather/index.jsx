import React, { useContext } from "react";
import { WeatherContext } from "../../Context";
import moment from "moment";
import { WeatherIcon } from "../../Reusable/WeatherIcon";
import CelciusFerenheit from "../../Reusable/CelciusConvert";
import CelciusConvert from "../../Reusable/CelciusConvert";

const index = () => {
  const { weatherData,isCelcius } = useContext(WeatherContext);

  const cityName = weatherData?.weather?.name;
  const currTemp = Math.floor(isCelcius ? weatherData?.weather?.main?.temp : CelciusConvert(weatherData?.weather?.main?.temp));
  const WeatherCondition = weatherData?.weather?.weather[0]?.description;
  const timestamp = weatherData?.weather?.dt;
  const currTime = moment.unix(timestamp).format("dddd, MMM D");
  
  return (
    <>
      <h2 className="text-center mb-4">Current Weather  </h2>
      <div className="d-flex justify-content-evenly align-items-center">
        <div className="">
          <h4>{cityName}</h4>
          <span>{currTime}</span>
        </div>
        <div className="">
          <h4>{currTemp} {isCelcius ? "°C" : "°F"}</h4>
          <span>{WeatherCondition}</span>
        </div>
        <div className="">
          <WeatherIcon icon={weatherData?.weather?.weather[0]?.icon} />
        </div>
      </div>
      <hr />
    </>
  );
};

export default index;

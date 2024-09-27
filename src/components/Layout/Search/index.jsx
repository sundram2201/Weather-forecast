import React, { useRef, useContext } from "react";
import { WeatherContext } from "../../Context";
import CurrentTime from "../../Reusable/CurrentTime";
import Loader from "../../Reusable/Loader";
import CelciusFerenheit from "../../Reusable/CelciusConvert";

const Search = () => {
  const { isLoading, searchValue, setSearchValue, cities, handleCityClick } =
    useContext(WeatherContext);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="custom-search">
      <CurrentTime />
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for cities..."
          value={searchValue}
          onChange={handleInputChange}
          ref={inputRef}
        />
        { isLoading && (
          <div className="loading position-absolute w-100 text-center">
           <Loader />
          </div>
        )}
        {cities?.length > 0 && (
          <ul className="suggestions">
            {cities.map((city) => (
              <li key={city.value} onClick={() => handleCityClick(city)}>
                {city.label}
              </li>
            ))}
          </ul>
        )}
        
      </div>
    </div>
  );
};

export default Search;

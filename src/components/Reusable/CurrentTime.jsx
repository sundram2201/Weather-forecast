import React, { useState, useEffect } from "react";
import moment from "moment";

 const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(
    moment().format("MMMM Do YYYY, h:mm:ss a")
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);  

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <span style={{color :"rgba(255,255,255,0.8)"}}>Local date & time : {currentTime}</span>
    </div>
  );
};

export default CurrentTime;

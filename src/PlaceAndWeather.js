import React, { useState } from 'react';

const PlaceAndWeather = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceChange = (place) => {
    setSelectedPlace(place);
  };

  const handleShowWeather = () => {
    if (!selectedPlace) {
      alert('Please select a place first.');
      return;
    }
  
    const lat = selectedPlace.geometry.location.lat();
    const lng = selectedPlace.geometry.location.lng();
  
    const apiKey = '6eb1180161eccb06843669dbee0f87b3';
  
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
  
    fetch(weatherApiUrl)
      .then(response => response.json())
      .then(data => {
        const weatherInfo = (
          <div>
            <h2>Weather in {selectedPlace.name}</h2>
            <p>Temperature: {data.main.temp} °C</p>
            <p>Condition: {data.weather[0].main}</p>
            <p>Location: {data.name}</p>
            <p>Weather Description: {data.weather[0].description}</p>
          </div>
        );
  
        return weatherInfo;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };
  
        setSelectedPlace(null);

      
     

  return (
    <div>
      <input
        id="placeInput"
        type="text"
        placeholder="Enter a place"
        onChange={handlePlaceChange}
      />
      <button onClick={handleShowWeather}>Show Weather</button>
      <div id="weatherInfo">{selectedPlace}</div>
    </div>
  );
};

export default PlaceAndWeather;

import { useState, useEffect } from "react";
import Loading from "./loading";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";

import styles from "./styles/weatherApp.module.css";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = "Weather | " + weather?.location?.name ?? "";
  }, [weather]);

  async function loadInfo(city = "london") {
    console.log(
      `${'http://api.weatherapi.com/v1/current.json?aqi=no'}&key=${'15e99db8e2c54ad18e1204835231503'}&q=${city}`
    );
    try {
      const request = await fetch(
        `${'http://api.weatherapi.com/v1/current.json?aqi=no'}&key=${'15e99db8e2c54ad18e1204835231503'}&q=${city}`
      );
      const json = await request.json();
      console.log(json);

      setTimeout(() => {
        setWeather({ ...json });
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * Actualiza la ciudad cada que el usuario ingrese una nueva
   * @param {string} city ciudad a actualizar
   */
  function handleOnChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleOnChangeCity} />
      {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
    </div>
  );
}

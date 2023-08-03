import { useState } from "react";
import Swal from "sweetalert2";

import styles from "./styles/weatherForm.module.css";

export default function WeatherForm({ onChangeCity }) {
  const [city, setCity] = useState("");

  /**
   * Actualiza la ciudad.
   * @param {event} e
   */
  function handleChange(e) {
    setCity(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!city.trim()) {
      return; // Evita enviar una solicitud vacía
    }

    const weatherData = await fetchWeatherData(city);

    if (!weatherData || weatherData.cod === "404") {
      // Ciudad no encontrada
      Swal.fire({
        icon: "error",
        title: "Ciudad no encontrada",
        text: "La ciudad ingresada no existe. Por favor, ingresa una ciudad válida.",
      });
    } else {
      // Ciudad encontrada, llamar a onChangeCity
      onChangeCity(city);
    }
  }

  async function fetchWeatherData(city) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}?q=${city}&appid=${process.env.REACT_APP_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener datos del clima:", error);
      return null;
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Ingresa una ciudad"
      />
    </form>
  );
}

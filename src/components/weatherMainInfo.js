import React from "react";
import styles from "./styles/weatherMainInfo.module.css";
import Swal from "sweetalert2";

export default function WeatherMainInfo({ weather }) {

  const cityNotFound = weather.location === undefined;

  if (cityNotFound) {
    Swal.fire({
      icon: "error",
      title: "Ciudad no existente",
      text: "La ciudad ingresada no ha sido encontrada en los datos del clima.",
    });
  }

  return (
    <div className={styles.mainInfo}>
    <div className={styles.city}>{weather?.location?.name}</div>
    <div className={styles.country}>{weather?.location?.country}</div>
    <div className={styles.row}>
      <div>
        <img
          src={`http:${weather?.current?.condition?.icon}`}
          width="100"
          alt="weather icon"
        />
      </div>
      <div className={styles.weatherConditions}>
        <div className={styles.condition}>
          {weather?.current?.condition.text}
        </div>
        <div className={styles.current}>{weather?.current?.temp_c}º</div>
      </div>
    </div>
        
        <input className={styles.raya}></input>
        <h3 className={styles.verelmapa}>Ver el mapa</h3>
        <div className={styles.ubicacion}>
        <iframe
        title="map"
        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15057.534307180755!2d${weather.location.lon}5!3d${weather.location.lat}5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smx!4v1651103744472!5m2!1sen!2smx`}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
       
        </div>
      </div>
  
  );
}

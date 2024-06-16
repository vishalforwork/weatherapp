import { IconButton, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [coords, setCoords] = useState({});

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCity = () => {
    setCity(search);
  };

  const getWeatherByCoords = async (lat, lon) => {
    try {
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e39dc380b6774994733b8a338344cb90`
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getWeatherByCity = async (city) => {
    try {
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"e39dc380b6774994733b8a338344cb90"}`
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          getWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          getWeatherByCity("ahmedabad");
        }
      );
    } else {
      getWeatherByCity("ahmedabad");
    }
  }, []);

  useEffect(() => {
    if (city) {
      getWeatherByCity(city);
    }
  }, [city]);

  return (
    <div
    style={{
      display: "flex",
      background: `url("https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      }}
      >
      <div
          className="box"
        style={{
          height: "70%",
          width: "45%",
          display:"flex",
          flexDirection:"column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"} style={{ marginLeft: "20px" }}>
          <TextField
            placeholder="Search City"
            name="search"
            type="text"
            className="m-3"
            onChange={handleSearch}
          />
          <IconButton onClick={handleCity}>search</IconButton>
        </Stack>

        {data && data.main ? (
          <div>
            <div
              className="d-flex m-4"
              style={{ justifyContent: "center", alignItems: "end" }}
            >
              <h1 className="m-1 text-center">{data?.sys?.country}</h1>
              <h3 className="m-1 text-center">{data?.name}</h3>
            </div>

            <div className="row m-4">
              <h1 className="m-1 text-center">Feels Like: {data?.main?.feels_like} &deg;C</h1>
              <h2 className="m-1 text-center">Temperature: {data?.main?.temp} &deg;C</h2>
            </div>

            <div className="row m-4">
              <h4 className="m-1 text-center">Max: {data?.main?.temp_max} &deg;C</h4>
              <h4 className="m-1 text-center">Min: {data?.main?.temp_min} &deg;C</h4>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Weather;

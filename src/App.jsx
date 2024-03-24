import { useEffect } from "react";
import FutureForecast from "./components/FutureForecast";
import CurrentForecast from "./components/current-forecast/CurrentForecast";
import Header from "./components/header/Header";
import getFormattedWeatherData from "./services/weatherService";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setQuery,
  setWeather,
} from "./store/weatherReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const { query, units, weather } = useSelector((state) => state);

  useEffect(() => {
    async function fetchWeatherBasedOnLoc() {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            const weatherResp = await getFormattedWeatherData({
              lat,
              lon,
              units,
            });

            dispatch(setQuery({ lat, lon }));
            dispatch(setWeather(weatherResp));
          });
        } else {
          const weatherResp = await getFormattedWeatherData({
            ...query,
            units,
          });

          dispatch(setWeather(weatherResp));
        }
      } catch (error) {
        dispatch(
          setError({
            status: "404",
            statusText: "Something went wrong!!! Please try after some",
          })
        );
        console.error(error);
      }
    }

    fetchWeatherBasedOnLoc();
  }, []);

  return (
    <div className="box-border h-dvh bg-gradient-to-br from-cyan-300 to-blue-400">
      <Header />
      {weather && (
        <div className="mx-auto sm:py-3 md:py-4 lg:py-5 py-2 sm:px-8 md:px-12 lg:px-16 px-4">
          <CurrentForecast />
          <FutureForecast title={"5-Days Weather Forecast"} />
        </div>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        theme="colored"
      />
    </div>
  );
}

export default App;

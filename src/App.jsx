import { useEffect } from "react";
import FutureForecast from "./components/FutureForecast";
import CurrentForecast from "./components/current-forecast/CurrentForecast";
import Header from "./components/header/Header";
import getFormattedWeatherData from "./services/weatherService";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading, setQuery, setWeather } from "./store/weatherReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundry from "./components/ErrorBoundry";
import Loading from "./components/Loading";

function App() {
  const dispatch = useDispatch();
  const { query, units, weather, loading } = useSelector((state) => state);

  useEffect(() => {
    async function fetchWeatherBasedOnLoc() {
      try {
        await dispatch(setLoading(true));

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
            dispatch(setLoading(false));
          });
        } else {
          const weatherResp = await getFormattedWeatherData({
            ...query,
            units,
          });

          dispatch(setWeather(weatherResp));
          dispatch(setLoading(false));
        }
      } catch (error) {
        dispatch(setLoading(false));
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
    <div className="box-border h-dvh relative bg-gradient-to-br from-cyan-500 to-blue-600">
      <Header />
      <ErrorBoundry>
        <div className="mx-auto sm:py-3 md:py-4 lg:py-5 py-2 sm:px-8 md:px-12 lg:px-16 px-4">
          {loading && <Loading />}
          {!loading && weather && (
            <>
              <CurrentForecast />
              <FutureForecast title={"5-Days Weather Forecast"} />
            </>
          )}
        </div>
      </ErrorBoundry>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        theme="colored"
      />
    </div>
  );
}

export default App;

import { useEffect } from "react";
import "./App.css";
import FutureForecast from "./components/FutureForecast";
import CurrentForecast from "./components/current-forecast/CurrentForecast";
import Header from "./components/header/Header";
import getFormattedWeatherData from "./services/weatherService";
import { useDispatch, useSelector } from "react-redux";
import { setWeather } from "./store/weatherReducer";

function App() {
  const dispatch = useDispatch();
  const {query, units, weather} = useSelector((state) => state);


  useEffect(() => {
    //fetch weather data on initial load, search updates, and unit changes
    (async function() {
      console.log('IN eFFECT: ', query, units);
      console.log('---------');
      const weatherResponse = await getFormattedWeatherData({...query, units});
      await dispatch(setWeather(weatherResponse));
    })();
  }, [query, units, dispatch]);

  return (
    <div className="box-border h-dvh bg-gradient-to-br from-cyan-300 to-blue-400">
      <Header />
      { weather && (
        <div className="mx-auto py-5 px-16 ">
          <CurrentForecast />
          <FutureForecast title={"5-Days Weather Forecast"} />
        </div>
      )}
    </div>
  );
}

export default App;

import { API_KEY, BASE_URL } from "../constants/env.const";
import { getFotmattedLocalTime } from "../utilities/localDataAndTimeFormat";
import { toast } from "react-toastify";

export const getWeatherData = (ver, infoType, searchParams) => {
    const url = new URL(`${BASE_URL}/${ver}/${infoType}`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return fetch(url)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          switch (resp.status) {
            case 400:
              toast.error('Invalid request.');
              break;
            case 401:
              toast.error('You are not authorized.');
              break;
            case 404:
              toast.error('Place not found.');
              break;
            case 429:
              toast.error('Please try after sometime.');
              break;
            default:
              toast.error('Something went wrong.');
          }

          throw new Error(`${resp.status}: Something went wrong. Please try after sometime.`);
        }
      });
};

export const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    wind: { speed },
  } = data;

  const weatherData = weather[0];

  return {
    lat,
    lon,
    weatherData,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily } = data;

  // Extracting the next 5 day weather forecast data from daily array
  daily = daily.slice(1, 6).map(({ dt, temp, weather }) => {
    const { main, icon } = weather[0];

    return {
      title: getFotmattedLocalTime(dt, timezone, "ccc"),
      temp: temp.day,
      min: temp.min,
      max: temp.max,
      detail: main,
      icon: icon,
    };
  });

  return { timezone, daily };
};

export const getFormattedWeatherData = async (searchParams) => {
    let formattedCurrentWeatherData = {};
    let formattedForecastWeatherData = {};
    const currentWeatherResp = await getWeatherData(
      "2.5",
      "weather",
      searchParams
    );

    if (currentWeatherResp) {
      formattedCurrentWeatherData = formatCurrentWeather(currentWeatherResp);
      const { lat, lon } = formattedCurrentWeatherData;
    
      const forecastWeatherResp = await getWeatherData("3.0", "onecall", {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
      });

      if (forecastWeatherResp) {
        formattedForecastWeatherData = formatForecastWeather(forecastWeatherResp);
      }

      return {
        ...formattedCurrentWeatherData,
        ...formattedForecastWeatherData,
      };
    }
};

export default getFormattedWeatherData;

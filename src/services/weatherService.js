import { API_KEY, BASE_URL } from "../constants/env.const";
import { getFotmattedLocalTime } from "../utilities/localDataAndTimeFormat";

export const getWeatherData = (ver, infoType, searchParams) => {
  console.log('getWeatherData');
  console.log('Search params: ', searchParams);
  const url = new URL(`${BASE_URL}/${ver}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  console.log('URL IS: ', url);
  console.log('---- End -----');
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
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
  const currentWeatherResp = await getWeatherData("2.5", "weather", searchParams);
  const formattedCurrentWeatherData = formatCurrentWeather(currentWeatherResp);

  const { lat, lon } = formattedCurrentWeatherData;

  const forecastWeatherResp = await getWeatherData("3.0", "onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  });
  const formattedForecastWeatherData =
    formatForecastWeather(forecastWeatherResp);

  return {
    ...formattedCurrentWeatherData,
    ...formattedForecastWeatherData,
  };
};

export default getFormattedWeatherData;

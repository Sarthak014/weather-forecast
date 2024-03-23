import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { getWeatherIcon } from "../../utilities/weatherIconURL";
import { getFotmattedLocalTime } from "../../utilities/localDataAndTimeFormat";
import { useSelector } from "react-redux";

function WeatherDetails() {
  const {
    weatherData: { id, main, description, icon },
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  } = useSelector((state) => state.weather);

  return (
    <div id={`weather-details-container-${id}`}>
      {/* weather description */}
      <div className="flex flex-col items-center justify-center py-6 text-xl font-bold text-cyan-300 capitalize">
        <p>{main}</p>
        <p>{description}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3">
        {/* weather icon */}
        <img src={getWeatherIcon(icon)} alt="weather icon" className="w-32" />

        {/* temperature */}
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>

        {/* weather details - real fell, humidity, wind */}
        <div className="flex flex-col items-start space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real fell: <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity: <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>

          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind: <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      {/* Weather Detials: Sunrise, sunset, Max temp and Min temp */}
      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-light">
          Rise: <span className="font-medium ml-1">{getFotmattedLocalTime(sunrise, timezone, 'hh:mm a')}</span>
        </p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light">
          Set: <span className="font-medium ml-1">{getFotmattedLocalTime(sunset, timezone, 'hh:mm a')}</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowUp />
        <p className="font-light">
          High: <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowDown />
        <p className="font-light">
          Low: <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default WeatherDetails;

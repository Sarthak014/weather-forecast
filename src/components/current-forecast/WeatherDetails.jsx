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
      <div
        className="
        flex flex-col items-center
        justify-center
        sm:py-4 md:py-5 lg:py-6 py-2
        sm:text-base md:text-lg lg:text-xl text-sm
        font-bold
        text-cyan-300 capitalize"
      >
        <p>{main}</p>
        <p>{description}</p>
      </div>

      <div
        className="
        flex
        flex-row
        items-center
        justify-between
        text-white
        py-4"
      >
        {/* weather icon */}
        <img
          src={getWeatherIcon(icon)}
          alt="weather icon"
          className="sm:w-16 md:w-24 lg:w-32 w-16"
        />

        {/* temperature */}
        <p className="sm:text-xl md:text-2xl lg:text-5xl text-lg">{`${temp.toFixed()}°`}</p>

        {/* weather details - real fell, humidity, wind */}
        <div className="flex flex-col items-start sm:space-y-2 space-y-1">
          <div className="flex font-light sm:text-sm text-xs items-center justify-center">
            <UilTemperature size={18} className="mr-1 md:w-6 w-3" />
            Real fell:{" "}
            <span className="md:font-medium font-light ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>

          <div className="flex font-light sm:text-sm text-xs items-center justify-center">
            <UilTear size={18} className="mr-1 md:w-6 w-3" />
            Humidity:{" "}
            <span className="md:font-medium font-light ml-1">{`${humidity.toFixed()}%`}</span>
          </div>

          <div className="flex font-light sm:text-sm text-xs items-center justify-center">
            <UilWind size={18} className="mr-1 md:w-6 w-3" />
            Wind:{" "}
            <span className="md:font-medium font-light ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      {/* Weather Detials: Sunrise, sunset, Max temp and Min temp */}
      <div
        className="
        flex
        flex-row
        items-center
        justify-center
        md:space-x-2 space-x-1
        text-white
        text-sm
        py-3"
      >
        <UilSun className="md:w-6 w-4" />
        <p className="font-light">
          <span className="sm:text-sm text-xs">Rise: </span>
          <span className="sm:font-normal md:font-medium font-extralight sm:text-sm text-xs ml-1">
            {getFotmattedLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilSunset className="md:w-6 w-4" />
        <p className="font-light">
          <span className="sm:text-sm text-xs">Set: </span>
          <span className="sm:font-normal md:font-medium font-extralight sm:text-sm text-xs ml-1">
            {getFotmattedLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilArrowUp className="md:w-6 w-4" />
        <p className="font-light">
          <span className="sm:text-sm text-xs">High: </span>
          <span className="sm:font-normal md:font-medium font-extralight sm:text-sm text-xs ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowDown className="md:w-6 w-4" />
        <p className="font-light">
          <span className="sm:text-sm text-xs">Low: </span>
          <span className="sm:font-normal md:font-medium font-extralight sm:text-sm text-xs ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default WeatherDetails;

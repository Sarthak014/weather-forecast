import PropTypes from "prop-types";
import { getWeatherIcon } from "../utilities/weatherIconURL";
import { useSelector } from "react-redux";

function FutureForecast({title}) {
  const { daily: forecastWeatherDetails } = useSelector((state) => state.weather);

  return (
    <div className="mt-14">
      <div className="flex items-center justify-start">
        <p className="text-white font-medium uppercase sm:text-sm md:text-base text-sm">
          {title}
        </p>
      </div>

      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        {forecastWeatherDetails.map(({detail, icon, max, min, title}, index) => {
          return (
            <div key={index} className="flex flex-col items-center justify-center">
              <p className="font-light md:text-sm text-xs">{title}</p>
              <figure className="my-2">
                <img
                  src={getWeatherIcon(icon)}
                  className="sm:w-9 md:w-12 w-7"
                  alt="weather-icon"
                />
                <figcaption className="sm:text-sm md:text-base text-xs">{detail}</figcaption>
              </figure>
              <p className="md:font-medium font-normal mt-4 sm:text-sm md:text-base text-xs">{`${min.toFixed()}° / ${max.toFixed()}°`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

FutureForecast.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FutureForecast;

import PropTypes from "prop-types";
import { getWeatherIcon } from "../utilities/weatherIconURL";
import { useSelector } from "react-redux";

function FutureForecast({title}) {
  const { daily: forecastWeatherDetails } = useSelector((state) => state.weather);

  return (
    <div className="mt-14">
      <div className="flex items-center justify-start">
        <p className="text-white font-medium uppercase">
          {title}
        </p>
      </div>

      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        {forecastWeatherDetails.map(({detail, icon, max, min, title}, index) => {
          return (
            <div key={index} className="flex flex-col items-center justify-center">
              <p className="font-light text-sm">{title}</p>
              <figure className="my-2">
                <img
                  src={getWeatherIcon(icon)}
                  className="w-12"
                  alt="weather-icon"
                />
                <figcaption>{detail}</figcaption>
              </figure>
              <p className="font-medium mt-4">{`${min.toFixed()}° / ${max.toFixed()}°`}</p>
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

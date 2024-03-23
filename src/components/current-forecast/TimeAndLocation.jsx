import { useSelector } from "react-redux";
import { getFotmattedLocalTime } from "../../utilities/localDataAndTimeFormat";

function TimeAndLocation() {
  const {dt, timezone, name, country} = useSelector((state) => state.weather);
  const localTime = getFotmattedLocalTime(dt, timezone);

  return (
    <>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {localTime}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">
          {`${name}, ${country}`}
        </p>
      </div>
  </>
  )
}

export default TimeAndLocation;

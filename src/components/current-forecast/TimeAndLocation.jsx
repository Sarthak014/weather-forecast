import { useSelector } from "react-redux";
import { getFotmattedLocalTime } from "../../utilities/localDataAndTimeFormat";

function TimeAndLocation() {
  const {dt, timezone, name, country} = useSelector((state) => state.weather);
  const localTime = getFotmattedLocalTime(dt, timezone);

  return (
    <>
      <div className="flex items-center justify-center sm:my-3 md:my-5 my-2">
        <p className="text-white sm:text-sm md:text-base lg:text-xl text-xs font-extralight">
          {localTime}
        </p>
      </div>

      <div className="flex items-center justify-center md:my-3 my-2">
        <p className="text-white sm:text-sm md:text-base lg:text-xl xl:text-3xl text-xs font-medium">
          {`${name}, ${country}`}
        </p>
      </div>
  </>
  )
}

export default TimeAndLocation;

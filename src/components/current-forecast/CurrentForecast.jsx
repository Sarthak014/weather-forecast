import TimeAndLocation from "./TimeAndLocation";
import WeatherDetails from "./WeatherDetails";

function CurrentForecast() {
  return (
    <div className="w-full">
      {/* <div>{apiData}</div> */}
      <TimeAndLocation />
      <WeatherDetails />
    </div>
  );
}

export default CurrentForecast;

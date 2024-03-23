import TimeAndLocation from "./TimeAndLocation";
import WeatherDetails from "./WeatherDetails";

function CurrentForecast() {
  return (
    <div className="w-full">
      <TimeAndLocation />
      <WeatherDetails />
    </div>
  );
}

export default CurrentForecast;

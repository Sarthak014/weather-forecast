import { UilWindsock } from "@iconscout/react-unicons";

function Logo() {
  return (
    <a
      className="flex flex-row items-center justify-center space-x-1 header-logo"
      href="/"
    >
      <UilWindsock
        size={25}
        className="text-white cursor-pointer"
        aria-label="Weather Stock Logo"
      />
      <span className="flex flex-row justify-center items-center  text-xl font-mono text-white">
        WeatherStock
      </span>
    </a>
  );
}

export default Logo;

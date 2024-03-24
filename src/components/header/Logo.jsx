import { UilWindsock } from "@iconscout/react-unicons";

function Logo() {
  return (
    <a
      className="
        flex flex-row
        items-center
        justify-start
        space-x-1
        header-logo
        md:mb-0 mb-6"
      href="/"
    >
      <UilWindsock
        size={25}
        className="text-white cursor-pointer"
        aria-label="Weather Stock Logo"
      />
      <span className="flex flex-row justify-center items-center md:text-lg lg:text-xl text-sm font-mono text-white">
        WeatherStock
      </span>
    </a>
  );
}

export default Logo;

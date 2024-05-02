import { UilSearch, UilMapMarker } from "@iconscout/react-unicons";
import ButtonGroup from "../ButtonGroup";
import { tempBtnSchema } from "../../constants/buttons.const";
import { useState } from "react";
import { useDeferredValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setQuery, setUnits, setWeather } from "../../store/weatherReducer";
import getFormattedWeatherData from "../../services/weatherService";

function HeaderItems() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const searchDefVal = useDeferredValue(search);
  const { query, units } = useSelector((state) => state);

  function handleInputChange(event) {
    setSearch(event.target.value);
  }

  async function handleInputKeyCapture(event) {
    const { key, keyCode } = event;
    const isEnterKeyPressed = key==='Enter' || keyCode===13;

    if (isEnterKeyPressed && searchDefVal !== "") {
      await handleSearchClick();
    }
  }

  async function handleSearchClick() {
    try {
      if (searchDefVal !== "") {
        await dispatch(setLoading(true));
        const queryObj = { q: searchDefVal };
        const weatherResponse = await getFormattedWeatherData({
          ...queryObj,
          units,
        });

        dispatch(setQuery(queryObj));

        if (weatherResponse) {
          dispatch(setWeather(weatherResponse));
          dispatch(setLoading(false));
        }
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
    }
  }

  async function handleLocationClick() {
    try {
      await dispatch(setLoading(true));

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;

          dispatch(setQuery({ lat, lon }));
        });
      }
      const weatherResponse = await getFormattedWeatherData({
        ...query,
        units,
      });

      if (weatherResponse) {
        dispatch(setWeather(weatherResponse));
      }

      dispatch(setLoading(false));
    } catch (error) {
      await dispatch(setLoading(false));
      console.error(error);
    }
  }

  async function handleClick(event) {
    try {
      const buttonName = event.currentTarget.name;

      if (buttonName !== units) {
        await dispatch(setLoading(true));
        dispatch(setUnits(buttonName));

        const weatherResponse = await getFormattedWeatherData({
          ...query,
          units,
        });

        if (weatherResponse) {
          dispatch(setWeather(weatherResponse));
        }

        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
    }
  }

  return (
    <div className="flex flex-row md:justify-center justify-between md:space-x-4 space-x-1">
      <div className="flex flex-row items-center md:justify-center justify-between md:space-x-3 md:w-auto w-3/4">
        <input
          value={searchDefVal}
          type="text"
          placeholder="search your city..."
          id="search-city-header"
          name="search"
          className="text-sm font-light md:p-2 p-1 shadow-sm focus:outline-none capitalize placeholder:lowercase md:w-auto w-3/4"
          onChange={handleInputChange}
          onKeyUpCapture={handleInputKeyCapture}
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-110 md:w-6 w-4"
          onClick={handleSearchClick}
        />
        <UilMapMarker
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-110 md:w-6 w-4"
          onClick={handleLocationClick}
        />
      </div>

      <ButtonGroup
        classes={`md:text-xl text-sm text-white font-light transition ease-out hover:scale-110`}
        data={tempBtnSchema}
        isDivider={true}
        handleClick={handleClick}
      />
    </div>
  );
}

export default HeaderItems;

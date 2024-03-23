import { UilSearch, UilMapMarker } from "@iconscout/react-unicons";
import ButtonGroup from "../ButtonGroup";
import { tempBtnSchema } from "../../constants/buttons.const";
import { useState } from "react";
import { useDeferredValue } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setUnits } from "../../store/weatherReducer";

function HeaderItems() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const searchDefVal = useDeferredValue(search);
  const units = useSelector((state) => state.units);

  function handleInputChange(event) {
    setSearch(event.currentTarget.value);
  }

  function handleSearchClick() {
    if (searchDefVal !== '') {
      dispatch(setQuery({q: searchDefVal}));
    }
  }

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        dispatch(setQuery({lat, lon}));
      });
    }
  }

  function handleClick(event) {
    const buttonName = event.currentTarget.name;
    console.log("buttonName: ", buttonName);

    if (buttonName !== units) {
      dispatch(setUnits(buttonName));
    }
  }

  return (
    <div className="flex flex-row justify-center space-x-4">
      <div className="flex flex-row items-center justify-center space-x-3">
        <input
          value={searchDefVal}
          type="text"
          placeholder="search your city..."
          id="search-city-header"
          name="search"
          className="text-sm font-light p-2 w-full shadow-sm focus:outline-none capitalize placeholder:lowercase"
          onChange={handleInputChange}
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-110"
          onClick={handleSearchClick}
        />
        <UilMapMarker
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-110"
          onClick={handleLocationClick}
        />
      </div>

      <ButtonGroup
        classes={`text-xl text-white font-light transition ease-out hover:scale-110`}
        data={tempBtnSchema}
        isDivider={true}
        handleClick={handleClick}
      />
    </div>
  );
}

export default HeaderItems;

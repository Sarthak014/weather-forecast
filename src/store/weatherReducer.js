import { createSlice } from "@reduxjs/toolkit";
import { state } from "./state";

export const weatherSlice = createSlice({
    name: "weather",
    initialState: state,
    reducers: {
        setQuery: (state, action) => {
            console.log('setQuery: ', action);
            state.query = action.payload;
        },
        setUnits: (state, action) => {
            state.units = action.payload;
        },
        setWeather: (state, action) => {
            console.log('setWeather: ', action);
            state.weather = action.payload;
        },
    }
});

export const {
    setQuery,
    setUnits,
    setWeather
  } = weatherSlice.actions;
  
  export default weatherSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { state } from "./state";

export const weatherSlice = createSlice({
    name: "weather",
    initialState: state,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setUnits: (state, action) => {
            state.units = action.payload;
        },
        setWeather: (state, action) => {
            state.weather = action.payload;
        },
        setError: (state, action) => {
            console.log(action);
            state.error = action.payload;
        }
    }
});

export const {
    setQuery,
    setUnits,
    setWeather,
    setError
  } = weatherSlice.actions;
  
  export default weatherSlice.reducer;

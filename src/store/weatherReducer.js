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
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const {
    setQuery,
    setUnits,
    setWeather,
    setError,
    setLoading
  } = weatherSlice.actions;
  
  export default weatherSlice.reducer;

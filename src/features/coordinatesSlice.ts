import { createSlice } from '@reduxjs/toolkit';

const coordinatesSlice = createSlice({
  name: 'coordinates',
  initialState: {
    lat: null,
    lon: null,
  },
  reducers: {
    setCoordinates: (state, action) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
  },
});

export const { setCoordinates } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;

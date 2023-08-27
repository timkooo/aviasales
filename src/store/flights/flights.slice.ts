import { createSlice } from '@reduxjs/toolkit';
import { NameSpaces } from '../../const';
import { FlightWithId } from '../../types/flight';
import { loadFlights } from '../api-actions';

export type InitialState = {
  flights: FlightWithId[];
  areFlightsLoading: boolean;
  flightsAmount: number;
};

const initialState: InitialState = {
  flights: [],
  areFlightsLoading: false,
  flightsAmount: 0,
};

export const flightsSlice = createSlice({
  name: NameSpaces.Flights,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadFlights.fulfilled, (state, action) => {
        state.flights = action.payload.data;
        state.flightsAmount = Number(action.payload.headers['X-Total-Count']);
        state.areFlightsLoading = false;
      })
      .addCase(loadFlights.pending, (state) => {
        state.areFlightsLoading = true;
      })
      .addCase(loadFlights.rejected, (state) => {
        state.flights = [];
        state.flightsAmount = 0;
        state.areFlightsLoading = false;
      });
    // .addCase(loadCameraById.fulfilled, (state, action) => {
    //   state.cameraById = action.payload;
    //   state.isCameraByIdLoading = false;
    // })
    // .addCase(loadCameraById.pending, (state) => {
    //   state.isCameraByIdLoading = true;
    // })
    // .addCase(loadCameraById.rejected, (state) => {
    //   state.cameraById = null;
    //   state.isCameraByIdLoading = false;
    // })
    // .addCase(loadSimilarCameras.fulfilled, (state, action) => {
    //   state.similarCameras = action.payload;
    //   state.areSimilarCamerasLoading = false;
    // })
    // .addCase(loadSimilarCameras.pending, (state) => {
    //   state.areSimilarCamerasLoading = true;
    // })
    // .addCase(loadSimilarCameras.rejected, (state) => {
    //   state.similarCameras = [];
    //   state.areSimilarCamerasLoading = false;
    // })
    // .addCase(loadSearchResults.fulfilled, (state, action) => {
    //   state.searchResults = action.payload;
    // });
  },
});

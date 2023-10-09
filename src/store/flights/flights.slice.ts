import { createSlice } from '@reduxjs/toolkit';
import { NameSpaces } from '../../const';
import { FlightWithId } from '../../types/flight';
import { loadFlightById, loadFlights, loadMoreFlights } from '../api-actions';

export type InitialState = {
  flights: FlightWithId[];
  areFlightsLoading: boolean;
  flightsAmount: number;
  flightById: FlightWithId | null;
  isFlightByIdLoading: boolean;
};

const initialState: InitialState = {
  flights: [],
  areFlightsLoading: false,
  flightsAmount: 0,
  flightById: null,
  isFlightByIdLoading: false,
};

export const flightsSlice = createSlice({
  name: NameSpaces.Flights,
  initialState,
  reducers: {
    removeAllFlights(state) {
      state.flights = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadFlights.fulfilled, (state, action) => {
        state.flights = action.payload.data;
        state.flightsAmount = Number(action.payload.headers['x-total-count']);
        state.areFlightsLoading = false;
      })
      .addCase(loadFlights.pending, (state) => {
        state.areFlightsLoading = true;
      })
      .addCase(loadFlights.rejected, (state) => {
        state.flights = [];
        state.flightsAmount = 0;
        state.areFlightsLoading = false;
      })
      .addCase(loadMoreFlights.fulfilled, (state, action) => {
        state.flights = [...state.flights, ...action.payload.data];
        state.flightsAmount = Number(action.payload.headers['x-total-count']);
        state.areFlightsLoading = false;
      })
      .addCase(loadMoreFlights.pending, (state) => {
        state.areFlightsLoading = true;
      })
      .addCase(loadMoreFlights.rejected, (state) => {
        state.flights = [];
        state.flightsAmount = 0;
        state.areFlightsLoading = false;
      })
      .addCase(loadFlightById.fulfilled, (state, action) => {
        if (action.payload) {
          state.flightById = action.payload;
        }
        state.isFlightByIdLoading = false;
      })
      .addCase(loadFlightById.pending, (state) => {
        state.isFlightByIdLoading = true;
      })
      .addCase(loadFlightById.rejected, (state) => {
        state.flightById = null;
        state.isFlightByIdLoading = false;
      });
  },
});

export const { removeAllFlights } = flightsSlice.actions;

import { NameSpaces } from '../../const';
import { RootState } from '../../types/store';

export const selectAreFlightsLoading = (state: RootState) => state[NameSpaces.Flights].areFlightsLoading;
export const selectFlights = (state: RootState) => state[NameSpaces.Flights].flights;
export const selectFlightsAmount = (state: RootState) => state[NameSpaces.Flights].flightsAmount;
export const selectFlightById = (state: RootState) => state[NameSpaces.Flights].flightById;
export const selectIsFlightByIfLoading = (state: RootState) => state[NameSpaces.Flights].isFlightByIdLoading;

import { NameSpaces } from '../../const';
import { RootState } from '../../types/store';

export const selectAreFlightsLoading = (state: RootState) => state[NameSpaces.Flights].areFlightsLoading;
export const selectFlights = (state: RootState) => state[NameSpaces.Flights].flights;
export const selectFlightsAmount = (state: RootState) => state[NameSpaces.Flights].flightsAmount;

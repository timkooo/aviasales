import { combineReducers } from '@reduxjs/toolkit';
import { NameSpaces } from '../const';
import { flightsSlice } from './flights/flights.slice';
import { applicationSlice } from './application/application.slice';
import { booksSlice } from './books/books.slice';
import { userSlice } from './user/user.slice';

export const rootReducer = combineReducers({
  [NameSpaces.Application]: applicationSlice.reducer,
  [NameSpaces.Flights]: flightsSlice.reducer,
  [NameSpaces.Books]: booksSlice.reducer,
  [NameSpaces.User]: userSlice.reducer,
});

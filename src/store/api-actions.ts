import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoutes, NameSpaces } from '../const';
import { api } from '../services/api';
import { FlightWithId } from '../types/flight';
import { RootState } from '../types/store';
import { resultsToShowByMode } from './application/application.slice';
import { BooksData } from '../types/booksData';
import { Book } from '../types/book';
import { AxiosError } from 'axios';

// type KnownError = {
//   errorMessage : string;
// }

export const loadFlights = createAsyncThunk(
  `${NameSpaces.Flights}/loadFlights`,
  async (currentPage : number, { getState }) => {
    const state = getState() as RootState;
    const fetchParams = state[NameSpaces.Application].fetchParams;
    const resultePerPage = resultsToShowByMode[state[NameSpaces.Application].screenMode];
    const params = Object.fromEntries(fetchParams.flatMap(Object.entries));
    const { data, headers } = await api.get<FlightWithId[]>(APIRoutes.Flights, {
      params: {
        ...params,
        '_start' : (currentPage - 1) * resultePerPage,
        '_end' : (currentPage - 1) * resultePerPage + resultePerPage,
      },
    });
    return { data, headers };
  }
);

export const loadMoreFlights = createAsyncThunk(
  `${NameSpaces.Flights}/loadMoreFlights`,
  async (currentPage : number, { getState }) => {
    const state = getState() as RootState;
    const fetchParams = state[NameSpaces.Application].fetchParams;
    const resultePerPage = resultsToShowByMode[state[NameSpaces.Application].screenMode];
    const params = Object.fromEntries(fetchParams.flatMap(Object.entries));
    const { data, headers } = await api.get<FlightWithId[]>(APIRoutes.Flights, {
      params: {
        ...params,
        '_start' : (currentPage - 1) * resultePerPage,
        '_end' : (currentPage - 1) * resultePerPage + resultePerPage,
      },
    });
    return { data, headers };
  }
);

export const loadFlightById = createAsyncThunk(
  `${NameSpaces.Flights}/loadFlightById`,
  async (flightId: string) => {
    if (typeof flightId === 'string') {
      const { data } = await api.get<FlightWithId[]>(`${APIRoutes.Flights}?id=${flightId}`);
      return data[0];
    }
  }
);

export const loadBooks = createAsyncThunk<BooksData | null, void, {rejectValue: string} >(
  `${NameSpaces.Books}/loadBooks`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const booksSearchParams = state[NameSpaces.Application].booksSearchParams;
      const { data } = await api.get<BooksData>(APIRoutes.Books, {
        params: booksSearchParams
      });
      return data;
    }
    catch(err) {
      if (err instanceof AxiosError) {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err.message);
      }
    }
    return null;
  }
);

export const loadMoreBooks = createAsyncThunk<BooksData | null, void, {rejectValue: string}>(
  `${NameSpaces.Books}/loadMoreBooks`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const booksSearchParams = state[NameSpaces.Application].booksSearchParams;
      const { data } = await api.get<BooksData>(APIRoutes.Books, {
        params: booksSearchParams
      });
      return data;
    }
    catch(err) {
      if (err instanceof AxiosError) {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err.message);
      }
    }
    return null;
  }
);

export const loadBookById = createAsyncThunk<Book | null, string, {rejectValue: string}>(
  `${NameSpaces.Books}/loadBookById`,
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get<Book>(`${APIRoutes.Books}/${id}`);
      return data;
    }
    catch(err) {
      if (err instanceof AxiosError) {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err.message);
      }
    }
    return null;
  }
);

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GOOGLE_API_KEY, MAX_SEARCH_RESULTS, NameSpaces, ScreenMode } from '../../const';

export const resultsToShowByMode: Record<string, number> = {
  [ScreenMode.Desktop] : 9,
  [ScreenMode.Mobile] : 3
};

export type BooksSearchParams = {
  q: string;
  startIndex: number;
  orderBy: string;
  maxResults: number;
  key: string;
}

export type InitialState = {
  screenMode: string;
  fetchParams: Record<string, string>[];
  booksSearchParams: BooksSearchParams;
};

const initialState: InitialState = {
  screenMode: ScreenMode.Mobile,
  fetchParams: [
    { _sort: 'dateFlight' },
    { _order: 'asc' },
  ],
  booksSearchParams: {
    q: '',
    startIndex: 0,
    orderBy: 'relevance',
    maxResults: MAX_SEARCH_RESULTS,
    key: GOOGLE_API_KEY,
  }
};

export const applicationSlice = createSlice({
  name: NameSpaces.Application,
  initialState,
  reducers: {
    updateFetchParams(state, action: PayloadAction<Record<string, string>[]>) {
      state.fetchParams = action.payload;
    },
    updateScreenMode(state, action: PayloadAction<string>) {
      state.screenMode = action.payload;
    },
    updateBooksSearchParams(state, action: PayloadAction<BooksSearchParams>) {
      state.booksSearchParams = action.payload;
    },
    resetBooksSearchParams(state) {
      state.booksSearchParams = initialState.booksSearchParams;
    }
  }
});

export const { updateFetchParams, updateScreenMode, updateBooksSearchParams } = applicationSlice.actions;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpaces } from '../../const';
import { loadBookById, loadBooks, loadMoreBooks } from '../api-actions';
import { Book } from '../../types/book';

export type InitialState = {
  books: Book[];
  totalItems: number;
  areBooksLoading: boolean;
  allBooksAreLoaded: boolean;
  currentFilter: string;
  currentBook: Book | null;
  isCurrentBookLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  books: [],
  totalItems: 0,
  areBooksLoading: false,
  allBooksAreLoaded: false,
  currentFilter: 'all',
  currentBook: null,
  isCurrentBookLoading: false,
  error: null,
};

export const booksSlice = createSlice({
  name: NameSpaces.Books,
  initialState,
  reducers: {
    removeAllBooks(state) {
      state.books = [];
    },
    updateBooksFilter(state, action: PayloadAction<string>) {
      state.currentFilter = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadBooks.fulfilled, (state, { payload }) => {
        if (payload?.items) {
          state.books = payload.items;
          state.totalItems = payload.totalItems;
        } else {
          state.books = [];
          state.totalItems = 0;
        }
        state.areBooksLoading = false;
        state.error = null;
      })
      .addCase(loadBooks.pending, (state) => {
        state.areBooksLoading = true;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.books = [];
        state.areBooksLoading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          if (action.error.message) {
            state.error = action.error.message;
          }
        }
      })
      .addCase(loadMoreBooks.fulfilled, (state, { payload }) => {
        if (payload?.items) {
          state.books = [...state.books, ...payload.items];
        } else {
          state.allBooksAreLoaded = true;
        }
        state.areBooksLoading = false;
        state.error = null;
      })
      .addCase(loadMoreBooks.pending, (state) => {
        state.areBooksLoading = true;
      })
      .addCase(loadMoreBooks.rejected, (state, action) => {
        state.areBooksLoading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          if (action.error.message) {
            state.error = action.error.message;
          } else {
            state.error = null;
          }
        }
      })
      .addCase(loadBookById.fulfilled, (state, action) => {
        state.currentBook = action.payload;
        state.isCurrentBookLoading = false;
        state.error = null;
      })
      .addCase(loadBookById.pending, (state) => {
        state.isCurrentBookLoading = true;
      })
      .addCase(loadBookById.rejected, (state, action) => {
        state.currentBook = null;
        state.isCurrentBookLoading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          if (action.error.message) {
            state.error = action.error.message;
          } else {
            state.error = null;
          }
        }
      });
  },
});

export const { removeAllBooks, updateBooksFilter } = booksSlice.actions;

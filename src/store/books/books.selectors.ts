import { createSelector } from '@reduxjs/toolkit';
import { NameSpaces } from '../../const';
import { RootState } from '../../types/store';
import { filterBooks } from '../../utils/utils';
import { Book } from '../../types/book';

export const selectBooks = (state: RootState) => state[NameSpaces.Books].books;
export const selectCurrentFilter = (state: RootState) => state[NameSpaces.Books].currentFilter;

export const selectCurrentBooks = createSelector(
  [selectBooks, selectCurrentFilter],
  (books, filter): Book[] => {
    if (filter !== 'all') {
      return filterBooks(books, filter);
    }
    return books;
  }
);

export const selectAreBooksLoading = (state: RootState) => state[NameSpaces.Books].areBooksLoading;
export const selectBooksTotalCount = (state: RootState) => state[NameSpaces.Books].totalItems;
export const selectAllBooksAreLoaded = (state: RootState) => state[NameSpaces.Books].allBooksAreLoaded;
export const selectCurrentBook = (state: RootState) => state[NameSpaces.Books].currentBook;
export const selectIsCurrentBookLoading = (state: RootState) => state[NameSpaces.Books].isCurrentBookLoading;
export const selectBooksError = (state: RootState) => state[NameSpaces.Books].error;

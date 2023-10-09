import { NameSpaces } from '../../const';
import { RootState } from '../../types/store';

// export const selectSorting = (state: RootState) => state[NameSpaces.Application].sorting;
export const selectFetchParams = (state: RootState) => state[NameSpaces.Application].fetchParams;
export const selectScreenMode = (state: RootState) => state[NameSpaces.Application].screenMode;
export const selectBooksSearchParams = (state: RootState) => state[NameSpaces.Application].booksSearchParams;

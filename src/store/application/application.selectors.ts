import { NameSpaces } from '../../const';
import { RootState } from '../../types/store';

export const selectSorting = (state: RootState) => state[NameSpaces.Application].sorting;
export const selectResultsPerPage = (state: RootState) => state[NameSpaces.Application].resultsPerPage;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpaces } from '../../const';
import { Filters } from '../../types/filters';

export type Sorting = {
  _sort?: Filters;
  _order?: 'asc' | 'desc';
}

export type InitialState = {
  resultsPerPage: number;
  sorting: Sorting;
};

const initialState: InitialState = {
  resultsPerPage: 9,
  sorting: {
    _sort: 'dateFlight',
    _order: 'asc',
  }
};

export const applicationSlice = createSlice({
  name: NameSpaces.Application,
  initialState,
  reducers: {
    updateSorting(state, action: PayloadAction<Sorting>) {
      state.sorting = action.payload;
    },
  }
});

export const { updateSorting } = applicationSlice.actions;

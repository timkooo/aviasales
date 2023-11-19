import { NameSpaces } from '../../const';
import { RootState } from '../../types/store';

export const selectUserName = (state: RootState) => state[NameSpaces.User].userName;
export const selectError = (state: RootState) => state[NameSpaces.User].error;
export const selectUserAuthorized = (state: RootState) => state[NameSpaces.User].userAuthorized;

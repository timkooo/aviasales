import { Book } from './book';

export type BooksData = {
  kind: string;
  totalItems: number;
  items: Book[];
};

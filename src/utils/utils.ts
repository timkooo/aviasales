import { Book } from '../types/book';

export const formatDateAttribute = (date: string) =>
  new Date(date).toLocaleString('ru-RU');

export const debounce = <A extends string[]>(callback: (...params: A) => void, timeoutDelay = 500) => {
  let timeoutId: NodeJS.Timeout;
  return (...params: A) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...params), timeoutDelay);
  };
};

export const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString();
};

export const filterBooks = (books: Book[], filter: string) => books.filter((book) => {
  if (book.volumeInfo) {
    if (book.volumeInfo.categories) {
      const filteredCatagories = book.volumeInfo.categories.filter((category: string) => category.includes(filter));
      if (filteredCatagories.length !== 0) {
        return true;
      }
    }
  }
  return false;
});


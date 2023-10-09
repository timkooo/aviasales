import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import {
  selectAllBooksAreLoaded,
  selectAreBooksLoading,
  selectBooksError,
  selectBooksTotalCount,
  selectCurrentBooks,
} from '../../store/books/books.selectors';
import { BookCard } from '../../components/book-card/book-card';
import { selectBooksSearchParams } from '../../store/application/application.selectors';
import { updateBooksSearchParams } from '../../store/application/application.slice';
import { loadMoreBooks } from '../../store/api-actions';
import React from 'react';

export const Books = () => {
  const books = useAppSelector(selectCurrentBooks);
  const booksSearchParams = useAppSelector(selectBooksSearchParams);
  const booksTotalCount = useAppSelector(selectBooksTotalCount);
  const areBooksLoading = useAppSelector(selectAreBooksLoading);
  const allBooksAreLoaded = useAppSelector(selectAllBooksAreLoaded);
  const error = useAppSelector(selectBooksError);
  const dispatch = useAppDispatch();

  const handleLoadMoreBooks = () => {
    const newSearchParams = {...booksSearchParams, startIndex: books.length};
    dispatch(updateBooksSearchParams(newSearchParams));
    dispatch(loadMoreBooks());
  };

  const isMoreButtonVisible = () => {
    if (books.length === 0 || allBooksAreLoaded || books.length >= booksTotalCount) {
      return false;
    }
    return true;
  };

  return (
    <section className="books">
      {areBooksLoading && <div className="books__message">Laoding Books</div>}
      {error && <div className="books__message">Folowing error occurred: { error }. Try again later</div>}
      {books.length === 0 ? !error && (
        <div className="books__message">
          Sorry, no books were found matching your search. Try another search query
        </div>
      ) : !areBooksLoading && (
        <React.Fragment>
          {booksTotalCount && <div className="books__statistics">Found {booksTotalCount} books</div>}
          <ul className="books__list">
            {books.map((book) => (
              <li key={book.id} className="books__item books-card">
                <BookCard book={book} />
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
      {isMoreButtonVisible() && <button className="books__load-more" onClick={handleLoadMoreBooks}>Load more</button>}
    </section>
  );
};

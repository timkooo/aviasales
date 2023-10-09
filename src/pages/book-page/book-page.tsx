import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { useParams } from 'react-router-dom';
import { loadBookById } from '../../store/api-actions';
import {
  selectCurrentBook,
  selectIsCurrentBookLoading,
} from '../../store/books/books.selectors';

export const BookPage = () => {
  const { id } = useParams();
  const book = useAppSelector(selectCurrentBook);
  const isBookLoading = useAppSelector(selectIsCurrentBookLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(loadBookById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const description = document.querySelector('.book-page__description');
    if (book?.volumeInfo.description && description) {
      description.innerHTML += book?.volumeInfo.description;
    }
  });

  return (
    <section className="book-page">
      {isBookLoading && <div className="book-page__message">Laoding Book</div>}
      {!book ? (<div>Sorry, no such book found</div>) : !isBookLoading && (
        <div className='book-page__data'>
          {book.volumeInfo?.imageLinks?.smallThumbnail && (
            <div className="book-page__image-wrapper">
              <img className='book-page__image'
                src={book.volumeInfo.imageLinks.smallThumbnail}
                alt="preview"
              />
            </div>
          )}
          <h1 className="book-page__title">{book.volumeInfo.title}</h1>
          {book.volumeInfo.categories && book.volumeInfo?.categories?.length !== 0 && (
            <ul className="book-page__categories">
              {book.volumeInfo.categories.map((category) => (
                <li key={category}>{category},</li>
              ))}
            </ul>
          )}
          {book.volumeInfo.authors && book.volumeInfo?.authors?.length !== 0 && (
            <ul className="book-page__authors">
              {book.volumeInfo.authors.map((author) => (
                <li key={author}>{author},</li>
              ))}
            </ul>
          )}
          {book.volumeInfo.description && (
            <p className="book-page__description"></p>
          )}
        </div>)}
    </section>
  );
};

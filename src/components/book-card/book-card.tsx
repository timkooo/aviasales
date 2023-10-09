import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../types/book';
import React from 'react';

type FlightCardProps = {
  book: Book;
}

export const BookCard: FC<FlightCardProps> = ( { book } ) => (
  <React.Fragment>
    { book.volumeInfo?.imageLinks?.smallThumbnail &&
      <Link className="books-card__image-wrapper" to={`/book/${book.id}`}>
        <img className="books-card__image" src={book.volumeInfo.imageLinks.smallThumbnail} alt='preview'/>
      </Link>}
    <h1 className="books-card__title">{book.volumeInfo.title}</h1>
    { book.volumeInfo.categories && book.volumeInfo?.categories?.length !== 0 && <p className="books-card__category">{book.volumeInfo?.categories[0]}</p> }
    { book.volumeInfo.authors && book.volumeInfo?.authors?.length !== 0 &&
      <ul className="books-card__authors">
        {book.volumeInfo.authors.map((author) => (<li className="books-card__author" key={author}>{author}</li>))}
      </ul>}
    <Link className="books-card__link" to={`/book/${book.id}`}>
      Подробнее
    </Link>
  </React.Fragment>
);

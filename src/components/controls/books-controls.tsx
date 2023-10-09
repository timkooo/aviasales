import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { loadBooks } from '../../store/api-actions';
import { GOOGLE_API_KEY, MAX_SEARCH_RESULTS } from '../../const';
import { updateBooksSearchParams } from '../../store/application/application.slice';
import { selectCurrentFilter } from '../../store/books/books.selectors';
import { updateBooksFilter } from '../../store/books/books.slice';
import { selectBooksSearchParams } from '../../store/application/application.selectors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultSearchParams = {
  q: '',
  startIndex: 0,
  orderBy: 'relevance',
  maxResults: MAX_SEARCH_RESULTS,
  key: GOOGLE_API_KEY,
};

export const BooksControls = () => {
  const currentFilter = useAppSelector(selectCurrentFilter);
  const searchParams = useAppSelector(selectBooksSearchParams);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    const newSearchParams = {...defaultSearchParams, q: value};
    dispatch(updateBooksSearchParams(newSearchParams));
    dispatch(updateBooksFilter('all'));
    navigate('books');
    dispatch(loadBooks());
  };

  const handleSearchBooksOnBlur = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = evt.target;
    if (searchParams.q !== value) {
      handleSearch(value);
    }
  };

  const handleSearchBooksOnEnter = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      const { value }: { value: string } = evt.currentTarget;
      handleSearch(value);
    }
  };

  const handleSearchOnClick = () => {
    navigate('books');
    handleSearch(searchQuery);
  };

  const handleSortingChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = evt.target;
    const newSearchParams = {...searchParams, orderBy: value};
    dispatch(updateBooksSearchParams(newSearchParams));
    dispatch(loadBooks());
  };

  const handleFilterChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = evt.target;
    dispatch(updateBooksFilter(value));
  };

  return (
    <div className="books-controls">
      <h1 className="books-controls__title">Search for books</h1>
      <div className="books-controls__search">
        <input className="books-controls__search-input" type="text" onBlur={handleSearchBooksOnBlur} onKeyUp={handleSearchBooksOnEnter} defaultValue={searchParams.q} onChange={(e)=>setSearchQuery(e.target.value)}/>
        <button className="books-controls__search-button" onClick={handleSearchOnClick}>Search</button>
      </div>
      <label className="books-controls__label" htmlFor="categories">Categories</label>
      <select className="books-controls__select" id="categories" name="category" onChange={handleFilterChange} value={currentFilter}>
        <option value="all">all</option>
        <option value="Art">art</option>
        <option value="Biography">biography</option>
        <option value="Computers">computers</option>
        <option value="History">history</option>
        <option value="Medical">medical</option>
        <option value="Poetry">poetry</option>
      </select>
      <label className="books-controls__label" htmlFor="sortings">Sorting by</label>
      <select className="books-controls__select" id="sortings" onChange={handleSortingChange} name="orderBy" value={searchParams.orderBy}>
        <option value="relevance">relevance</option>
        <option value="newest">newest</option>
      </select>
    </div>
  );
};


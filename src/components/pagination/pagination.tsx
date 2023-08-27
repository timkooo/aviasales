import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { selectFlightsAmount } from '../../store/flights/flights.selectors';
import { selectResultsPerPage } from '../../store/application/application.selectors';

type PaginationProps = {
  currentPage: number;
};

export const Pagination = ({ currentPage }: PaginationProps) => {
  const [urlParams] = useSearchParams();
  const flightsAmount = useAppSelector(selectFlightsAmount);
  const resultsPerPage = useAppSelector(selectResultsPerPage);
  const [pagesAmount, setPagesAmount] = useState<number>(1);
  const dispatch = useAppDispatch();

  const countPageNumber = () => Math.ceil(flightsAmount / resultsPerPage);

  useEffect(() => {
    setPagesAmount(countPageNumber);
  }, [dispatch, flightsAmount]);

  return (
    <div className="flights__pagination pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <Link
            className={classNames('pagination__link', 'pagination__link--text', {
              'visually-hidden': currentPage === 1,
            })}
            to={`/flights?page=${currentPage - 1}`}
          >
          Назад
          </Link>
        </li>
        {Array.from({ length: pagesAmount }, (v, k) => k + 1).map(
          (element, index) => (
            <li key={element} className="pagination__item">
              <Link
                className={classNames('pagination__link', {
                  'pagination__link--active': currentPage === index + 1,
                })}
                to={`/flights?page=${index + 1}&${urlParams.toString()}`}
              >
                {index + 1}
              </Link>
            </li>
          )
        )}
        <li className="pagination__item">
          <Link
            className={classNames('pagination__link', 'pagination__link--text', {
              'visually-hidden': currentPage === pagesAmount,
            })}
            to={`/flights?page=${currentPage + 1}`}
          >
          Далее
          </Link>
        </li>
      </ul>
    </div>
  );
};

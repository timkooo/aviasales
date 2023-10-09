import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { selectFlightsAmount } from '../../store/flights/flights.selectors';
import { selectScreenMode } from '../../store/application/application.selectors';
import { resultsToShowByMode } from '../../store/application/application.slice';

type PaginationProps = {
  currentPage: number;
};

export const Pagination = ({ currentPage }: PaginationProps) => {
  const [urlParams] = useSearchParams();
  const flightsAmount = useAppSelector(selectFlightsAmount);
  const screenMode = useAppSelector(selectScreenMode);
  const [pagesAmount, setPagesAmount] = useState<number>(1);
  const dispatch = useAppDispatch();

  const countPageNumber = useCallback(() => Math.ceil(flightsAmount / resultsToShowByMode[screenMode]), [flightsAmount, screenMode]);

  const paramsWethoutPage = () => {
    const newParams = new URLSearchParams(urlParams);
    newParams.delete('page');
    return newParams.toString() ? `&${newParams.toString()}` : '';
  };

  useEffect(() => {
    setPagesAmount(countPageNumber);
  }, [countPageNumber, dispatch, flightsAmount]);

  return (
    <div className="flights__pagination pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <Link
            className={classNames('pagination__link', 'pagination__link--text', {
              'visually-hidden': currentPage === 1,
            })}
            to={`/flights?page=${currentPage - 1}${paramsWethoutPage()}`}
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
                to={`/flights?page=${index + 1}${paramsWethoutPage()}`}
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
            to={`/flights?page=${currentPage + 1}${paramsWethoutPage()}`}
          >
          Далее
          </Link>
        </li>
      </ul>
    </div>
  );
};

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
    <div className="site-header__statistics statistics">
    </div>
  );
};

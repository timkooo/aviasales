import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { selectAreFlightsLoading, selectFlights, selectFlightsAmount } from '../../store/flights/flights.selectors';
import { loadFlights, loadMoreFlights } from '../../store/api-actions';
import { FlightCard } from '../../components/flight-card/flight-card';
import { Pagination } from '../../components/pagination/pagination';
import React from 'react';
import { Controls } from '../../components/controls/controls';
import { selectFetchParams, selectScreenMode } from '../../store/application/application.selectors';
import { ScreenMode } from '../../const';
import { usePageParam } from '../../hooks/use-page-param';
import { useScreenMode } from '../../hooks/use-screen-mode';

export const Flights = () => {
  const fetchParams = useAppSelector(selectFetchParams);
  const screenMode = useAppSelector(selectScreenMode);
  const [ currentPage, updateUrlPageParam ] = usePageParam();
  const flights = useAppSelector(selectFlights);
  const areFlightsLoading = useAppSelector(selectAreFlightsLoading);
  const flightsAmount = useAppSelector(selectFlightsAmount);
  const dispatch = useAppDispatch();
  const mounted = useRef(false);
  const observer = useRef<IntersectionObserver | null>(null);
  useScreenMode(updateUrlPageParam);

  const setObservable = (lastFlightNode: HTMLElement | null) => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && flightsAmount - flights.length > 0) {
        const nextPage = currentPage.pageNumber + 1;
        updateUrlPageParam(nextPage);
        if (lastFlightNode) {
          observer.current?.unobserve(lastFlightNode);
        }
      }
    });
    if (lastFlightNode && screenMode === ScreenMode.Mobile) {
      observer.current.observe(lastFlightNode);
    }
  };

  useEffect(() => {
    if (mounted.current === true) {
      return;
    }
    mounted.current = true;
    if (screenMode === ScreenMode.Desktop || currentPage.pageNumber === 1) {
      dispatch(loadFlights(currentPage.pageNumber));
    }
    if (screenMode === ScreenMode.Mobile && currentPage.pageNumber !== 1) {
      dispatch(loadMoreFlights(currentPage.pageNumber));
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, currentPage, fetchParams]);

  if (areFlightsLoading) {
    return <span>Laoding Flights</span>;
  }

  return (
    <section className="flights">
      <Controls />
      {flights.length === 0 ? (
        <div>Sorry, no flights were found matching your search. Try to change filter</div>
      ) : (
        <React.Fragment>
          <ul className="flights__list">
            {flights.map((flight, index) => (
              flights.length === index + 1 ?
                <li key={flight.id} className="flights__item" ref={setObservable}>
                  <FlightCard flight={flight}/>
                </li> :
                <li key={flight.id} className="flights__item">
                  <FlightCard flight={flight}/>
                </li>
            ))}
          </ul>

          {screenMode === ScreenMode.Desktop ? <Pagination currentPage={currentPage.pageNumber} /> : ''}
        </React.Fragment>
      )}
    </section>
  );
};

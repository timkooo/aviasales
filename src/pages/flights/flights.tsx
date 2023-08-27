import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { selectAreFlightsLoading, selectFlights } from '../../store/flights/flights.selectors';
import { loadFlights } from '../../store/api-actions';
import { FlightCard } from '../flight/flight-card';
import { Pagination } from '../../components/pagination/pagination';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const Flights = () => {
  const [ seachParams ] = useSearchParams();
  const page = Number(seachParams.get('page') ?? 1);
  const flights = useAppSelector(selectFlights);
  const flightsAreLoading = useAppSelector(selectAreFlightsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFlights(page));
  }, [dispatch, page, seachParams]);

  if (flightsAreLoading) {
    return <span>Laoding Flights</span>;
  }

  return (
    <section className="flights">
      {flights.length === 0 ? (
        <div>Sorry, no flights were found matching your search. Try to change filter</div>
      ) : (
        <React.Fragment>
          <ul className="flights__list">
            {flights.map((flight) => (
              <li key={flight.id} className="flights__item">
                <FlightCard flight={flight}/>
              </li>
            ))}
          </ul>

          <Pagination currentPage={page} />
        </React.Fragment>
      )}
    </section>
  );
};

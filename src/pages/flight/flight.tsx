import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { selectFlightById, selectIsFlightByIfLoading } from '../../store/flights/flights.selectors';
import { useParams } from 'react-router-dom';
import { loadFlightById } from '../../store/api-actions';
import { formatDateAttribute } from '../../utils/utils';

export const Flight = () => {
  const dispatch = useAppDispatch();
  const flightById = useAppSelector(selectFlightById);
  const isFlightByIdLoading = useAppSelector(selectIsFlightByIfLoading);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(loadFlightById(id));
    }
  }, [dispatch, id]);

  if (isFlightByIdLoading) {
    return <span>Laoding Flights</span>;
  }

  return flightById ?
    <article className="flights__flight-card flight-card">
      <h2 className="flight-card__flight">{flightById.flight}</h2>
      <p className="flight-card__plane-date">{formatDateAttribute(flightById.dateFlight)}</p>
      <p className="flight-card__plane-type">{flightById.plnType}</p>
      <p className="flight-card__plane-num">{flightById.pln}</p>
      <p className="flight-card__time-work">{flightById.timeWork}</p>
    </article> :
    <span>No such flight found</span>;
};

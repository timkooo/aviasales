import { FC } from 'react';
import { FlightWithId } from '../../types/flight';
import { Link } from 'react-router-dom';

type FlightCardProps = {
  flight: FlightWithId;
}

export const FlightCard: FC<FlightCardProps> = ({flight}) => (
  <article className="flights__flight-card flight-card">
    <h2 className="flight-card__flight">{flight.flight}</h2>
    <p className="flight-card__plane-type">{flight.plnType}</p>
    <p className="flight-card__plane-num">{flight.pln}</p>
    <p className="flight-card__time-work">{flight.timeWork}</p>
    <Link className="flight-card__link" to={`/flight/${flight.id}`}>
      подробнее
    </Link>
  </article>
);

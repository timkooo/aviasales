import { faker } from '@faker-js/faker';
import { Flight } from '../src/types/flight';

const returnFlightType = (date: Date) => {
  const currentDate = new Date();
  return date >= currentDate ? 1 : 0;
};

const makeFakeFlight = (): Flight => {
  const date = faker.date.anytime();
  const type = returnFlightType(date);
  return {
    dateFlight: date.toISOString(),
    flight: `${faker.airline.airline().iataCode}-${faker.airline.flightNumber({
      addLeadingZeros: true,
    })}`,
    plnType: faker.airline.airplane().name,
    pln: `${faker.string.numeric(3)}${faker.string.alpha({
      length: 2,
      casing: 'upper',
    })}`,
    timeFlight: faker.number.int({ min: 15000, max: 40000 }),
    timeBlock: faker.number.int({ min: 15000, max: 40000 }),
    timeNight: faker.number.int({ min: 15000, max: 40000 }),
    timeBiologicalNight: faker.number.int({ min: 15000, max: 40000 }),
    timeWork: faker.number.int({ min: 15000, max: 40000 }),
    type: type,
    takeoff: {
      name: faker.airline.airport().name,
      lat: faker.location.latitude({ precision: 8 }),
      long: faker.location.longitude({ precision: 8 }),
    },
    landing: {
      name: faker.airline.airport().name,
      lat: faker.location.latitude({ precision: 8 }),
      long: faker.location.longitude({ precision: 8 }),
    },
  };
};

export const db = () => ({
  flights: Array(20)
    .fill(null)
    .map((_, index) => ({ ...makeFakeFlight(), id: index })),
});

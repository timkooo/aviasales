export type Flight = {
  dateFlight: string;
  flight: string;
  plnType: string;
  pln: string;
  timeFlight: number;
  timeBlock: number;
  timeNight: number;
  timeBiologicalNight: number;
  timeWork: number;
  type: 0 | 1;
  takeoff: {
    name: string;
    lat: number;
    long: number;
  };
  landing: {
    name: string;
    lat: number;
    long: number;
  };
};

export type FlightWithId = Flight & { id: number };

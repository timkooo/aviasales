export const MAX_SEARCH_RESULTS = 30;
export const GOOGLE_API_KEY = 'AIzaSyCCrLPkLSMDLAKDTLx6fTRSa0mPT0KfQGQ';

export enum AppRoutes {
  Main = '/',
  Flights = '/flights',
  Flight = '/flight',
  Books = '/books',
  Book = '/book'
}

export enum NameSpaces {
  Application = 'APPLICATION',
  Flights = 'FLIGHTS',
  Books = 'BOOKS'
}

export enum APIRoutes {
  Flights = '/flights',
  Books = 'https://www.googleapis.com/books/v1/volumes'
}

export enum ParamNames {
  FlightPastDate = 'filter_past',
  FlightFutureDate = 'filter_future',
  SortingOrder = 'sorting_order',
  PlaneType = 'filter_planetype',
  DateFrom = 'filter_date_from',
  DateTo = 'filter_date_to',
  FlightType = 'flight_type',
  Sorting = 'filter_sorting',
}

export const paramNamesToParams: Record<string, string> = {
  [ParamNames.FlightPastDate] : 'dateFlight_lte',
  [ParamNames.FlightFutureDate] : 'dateFlight_gte',
  [ParamNames.SortingOrder] : '_order',
  [ParamNames.Sorting] : '_sort',
  [ParamNames.PlaneType] : 'plnType_like',
  [ParamNames.DateTo] : 'dateFlight_lte',
  [ParamNames.DateFrom] : 'dateFlight_gte',
  [ParamNames.FlightType] : 'type',
};

export enum ScreenMode {
  Desktop = 'desktop',
  Mobile = 'mobile',
}

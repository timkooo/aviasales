import { ParamNames, paramNamesToParams } from '../../const';
import { useUrlParams } from '../../hooks/use-url-params';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { selectFetchParams } from '../../store/application/application.selectors';
import { useAppSelector } from '../../hooks/rtk-hooks';

export const Controls = () => {
  const [ , updateUrlParams, isParamChecked ] = useUrlParams();
  const fetchParams = useAppSelector(selectFetchParams);

  const getDefaultFromDate = () => {
    const fromDate = fetchParams.find((param) => Object.keys(param)[0] === paramNamesToParams[ParamNames.DateFrom]);
    if (fromDate) {
      return fromDate[paramNamesToParams[ParamNames.DateFrom]];
    }
    return '';
  };

  const getDefaultToDate = () => {
    const toDate = fetchParams.find((param) => Object.keys(param)[0] === paramNamesToParams[ParamNames.DateTo]);
    if (toDate) {
      return toDate[paramNamesToParams[ParamNames.DateTo]];
    }
    return '';
  };

  return (
    <form className="flights__controls controls" action="#">
      <div className="event__field-group  event__field-group--time">
        <Flatpickr
          options={{
            enableTime: true,
            wrap: true,
            // eslint-disable-next-line camelcase
            time_24hr: true,
            dateFormat: 'd/m/y H:i:S',
          }}
          onChange={( dates, v, instance) => {
            if (dates[0]) {
              instance.input.value = dates[0].toISOString();
            }
          }}
          onValueUpdate={( dates, v, instance) => {
            if (dates[0]) {
              instance.input.value = dates[0].toISOString();
            }
          }}
          value={getDefaultFromDate()}
        >
          <label
            className="visually-hidden"
            htmlFor="event-start-time-1"
          >
            From
          </label>
          <input
            className="event__input  event__input--time"
            id="event-start-time-1"
            type="text"
            name={ParamNames.DateFrom}
            data-input
            onInput={updateUrlParams}
            onChange={updateUrlParams}
          />
        </Flatpickr>
        &mdash;
        <Flatpickr
          options={{
            enableTime: true,
            wrap: true,
            // eslint-disable-next-line camelcase
            time_24hr: true,
            dateFormat: 'd/m/y H:i',
          }}
          onChange={( dates, v, instance) => {
            if (dates[0]) {
              instance.input.value = dates[0].toISOString();
            }
          }}
          onValueUpdate={( dates, v, instance) => {
            if (dates[0]) {
              instance.input.value = dates[0].toISOString();
            }
          }}
          value={getDefaultToDate()}
        >
          <label
            className="visually-hidden"
            htmlFor="event-end-time-1"
          >
            To
          </label>
          <input
            className="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name={ParamNames.DateTo}
            data-input
            onInput={updateUrlParams}
            onChange={updateUrlParams}
          />
        </Flatpickr>
      </div>
      <input
        className="controls__input"
        type="checkbox"
        name={ParamNames.PlaneType}
        value={'Boeing'}
        onChange={updateUrlParams}
        checked={isParamChecked(ParamNames.PlaneType)}
      />
      <input
        className="controls__input"
        type="checkbox"
        name={ParamNames.FlightType}
        value='1'
        onChange={updateUrlParams}
        checked={isParamChecked(ParamNames.FlightType, '1')}
      />
      <input
        className="controls__input"
        type="checkbox"
        name={ParamNames.FlightType}
        value='0'
        onChange={updateUrlParams}
        checked={isParamChecked(ParamNames.FlightType, '0')}
      />
      <input
        className="controls__input"
        type="radio"
        name={ParamNames.SortingOrder}
        value="asc"
        onChange={updateUrlParams}
        checked={isParamChecked(ParamNames.SortingOrder, 'asc')}
      />
      <input
        className="controls__input"
        type="radio"
        name={ParamNames.SortingOrder}
        value="desc"
        onChange={updateUrlParams}
        checked={isParamChecked(ParamNames.SortingOrder, 'desc')}
      />
    </form>
  );
};

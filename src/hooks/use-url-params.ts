import { useSearchParams } from 'react-router-dom';
import { ParamNames, paramNamesToParams } from '../const';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './rtk-hooks';
import { updateFetchParams } from '../store/application/application.slice';
import { selectFetchParams } from '../store/application/application.selectors';


export const useUrlParams = () => {
  const [ urlParams, setUrlParams ] = useSearchParams();
  const fetchParams = useAppSelector(selectFetchParams);
  const dispatch = useAppDispatch();

  const isParamChecked = useCallback((name : string, value? : string) => fetchParams.some((param) => {
    if (value) {
      return Object.entries(param)[0][0] === paramNamesToParams[name] && Object.entries(param)[0][1] === value;
    }
    return Object.entries(param)[0][0] === paramNamesToParams[name];
  }), [fetchParams]);

  const getParamsWethoutPage = () => {
    const paramsWethoutPage = new URLSearchParams(urlParams);
    paramsWethoutPage.delete('page');
    return paramsWethoutPage;
  };

  const updateUrlParams = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    const paramName = paramNamesToParams[name];
    const params = [...urlParams];
    const paramRepeatCount = params.filter(([paramKey, _]) => paramKey === paramName).length;
    let paramIndex;
    paramRepeatCount >= 2 ?
      paramIndex = params.findIndex(([paramKey, paramValue]) => paramKey === paramName && paramValue === value) :
      paramIndex = params.findIndex(([paramKey, _]) => paramKey === paramName);
    // eslint-disable-next-line no-console
    console.log('1', paramIndex);
    if (paramIndex !== -1) {
      if (evt.target.type === 'checkbox' && !evt.target.checked) {
        removeUrlParam(paramName, value);
        return;
      }
      if (evt.target.type === 'radio' ) {
        updateUrlParam(paramName, value);
        return;
      }
      if (evt.target.type === 'text' && value === '') {
        removeUrlParam(paramName, value);
        return;
      }
    }
    addUrlParam(paramName, value);
  };

  const updateUrlParam = (key: string, value: string) => {
    const newUrlParams = new URLSearchParams(urlParams);
    newUrlParams.set(key, value);
    // eslint-disable-next-line no-console
    console.log('2', [...newUrlParams]);
    setUrlParams(newUrlParams);
    updateFetchParamsFromUrl(newUrlParams);
  };

  const removeUrlParam = (key: string, value?: string) => {
    if (value) {
      const params = [...urlParams];
      const paramIndex = params.findIndex(([paramKey, paramValue]) => paramKey === key && paramValue === value);
      params.splice(paramIndex, 1);
      const newUrlParams = new URLSearchParams(params);
      setUrlParams(newUrlParams);
      updateFetchParamsFromUrl(newUrlParams);
      return;
    }
    const newUrlParams = new URLSearchParams(urlParams);
    newUrlParams.delete(key, value);
    // eslint-disable-next-line no-console
    console.log('3', newUrlParams);
    setUrlParams(newUrlParams);
    updateFetchParamsFromUrl(newUrlParams);
  };

  const addUrlParam = (key: string, value: string) => {
    const newUrlParams = new URLSearchParams(urlParams);
    newUrlParams.append(key, value);
    // eslint-disable-next-line no-console
    console.log('4', newUrlParams);
    setUrlParams(newUrlParams);
    updateFetchParamsFromUrl(newUrlParams);
  };

  const updateFetchParamsFromUrl = (params: URLSearchParams) => {
    const newFetchParams: Record<string, string>[] = [
      { _sort: 'dateFlight' },
      { _order: 'asc' },
    ];
    params.forEach((value, key) => {
      if (key === 'page') {
        return;
      }
      if ([paramNamesToParams[ParamNames.Sorting], paramNamesToParams[ParamNames.SortingOrder]].includes(key)) {
        const defaultParamIndex = newFetchParams.findIndex((param) => Object.keys(param)[0] === key);
        newFetchParams.splice(defaultParamIndex, 1);
      }
      newFetchParams.push({[key]: value});
    });
    // eslint-disable-next-line no-console
    console.log(newFetchParams);
    dispatch(updateFetchParams(newFetchParams));
  };

  return [ urlParams, updateUrlParams, isParamChecked, getParamsWethoutPage ] as const;
};

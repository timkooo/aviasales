import { useCallback, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePageParam = () => {
  const [ currentPage, setCurrentPage ] = useState<{pageNumber: number}>({pageNumber : 1});
  const [ urlParams, setUrlParams ] = useSearchParams();

  const getUrlPageParam = useCallback(() => ({ pageNumber : Number(urlParams.get('page') ?? '1')}), [urlParams]);

  const updateUrlPageParam = useCallback((page: number) => {
    const newParams = new URLSearchParams(urlParams);
    newParams.set('page', page.toString());
    setUrlParams(newParams);
    setCurrentPage({pageNumber : page});
  }, [setUrlParams, urlParams]);

  useLayoutEffect(() => {
    setCurrentPage(getUrlPageParam());
  }, [getUrlPageParam]);

  return [ currentPage, updateUrlPageParam ] as const;
};

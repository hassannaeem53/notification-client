import { useQuery } from '@tanstack/react-query';
import HttpService, { ResponseInterface } from '../services/httpService';

interface QueryInterface {
  page: number;
  limit: number;
  is_active: boolean;
  applicationId?: string;
  eventId?: string;
  name?: string;
  sort?: string;
  sortby?: string;
}

const useData = <T>(
  page: number,
  entityName: string,
  is_active: boolean,
  parentId?: string,
  searchInput?: string,
  sort?: string,
  sortby?: string
) => {
  const service = new HttpService<T>(entityName);

  let queryParams: QueryInterface = {
    page: page,
    limit: 4,
    sort: sort,
    sortby: sortby,
    is_active: is_active,
  };
  if (entityName == 'applications') {
    if (searchInput) {
      queryParams = { ...queryParams, name: searchInput };
    } else queryParams = { ...queryParams };
  } else if (entityName == 'events') {
    if (searchInput)
      queryParams = {
        ...queryParams,
        applicationId: parentId,
        name: searchInput,
        is_active: is_active,
      };
    queryParams = { ...queryParams, applicationId: parentId };
  } else if (entityName == 'notifications') {
    if (searchInput)
      queryParams = { ...queryParams, eventId: parentId, name: searchInput };
    else queryParams = { ...queryParams, eventId: parentId };
  }

  return useQuery<ResponseInterface<T>, Error, ResponseInterface<T>>({
    queryKey: parentId
      ? [entityName, page, is_active, parentId, searchInput, sort, sortby]
      : [entityName, page, is_active, searchInput, sort, sortby],
    queryFn: () =>
      service.getAll({
        params: queryParams,
      }),
    // staleTime: ms("10m"),
    keepPreviousData: true,
    refetchOnWindowFocus: 'always',
  });
};

export default useData;

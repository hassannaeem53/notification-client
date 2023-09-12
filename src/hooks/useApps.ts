import { useQuery } from '@tanstack/react-query';
import appService from '../services/appService';

export interface App {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface AppInterface {
  applications: App[];
  pagination: {
    totalPages: number;
    pageSize: number;
    currentPage: number;
    totalCount: number;
  };
}

const useApps = (page: number) => {
  return useQuery<AppInterface, Error>({
    queryKey: ['apps', page],
    queryFn: () =>
      appService.getAll({
        params: {
          page: page,
          limit: 4,
        },
      }),
    //staleTime: ms('24h'),
    keepPreviousData: true,
  });
};

export default useApps;

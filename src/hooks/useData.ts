import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import appService from "../services/appService";
import eventService from "../services/eventService";
import notificationService from "../services/notificationService";

export interface App {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface ResponseInterface<T> {
  applications: T[];
  pagination: {
    totalPages: number;
    pageSize: number;
    currentPage: number;
    totalCount: number;
  };
}

const useData = <T>(page: number, entityName: string) => {
  const service =
    entityName == "apps"
      ? appService
      : entityName == "events"
      ? eventService
      : notificationService;

  return useQuery<ResponseInterface<T>, Error, ResponseInterface<T>>({
    queryKey: [entityName, page],
    queryFn: () =>
      service.getAll({
        params: {
          page: page,
          limit: 4,
        },
      }),
    staleTime: ms("24h"),
    keepPreviousData: true,
  });
};

export default useData;

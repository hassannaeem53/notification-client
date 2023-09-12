import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import HttpService, { ResponseInterface } from "../services/httpService";

interface QueryInterface {
  page: number;
  limit: number;
  applicationId?: string;
  eventId?: string;
}

const useData = <T>(page: number, entityName: string, parentId?: string) => {
  const service = new HttpService<T>(entityName);

  let queryParams: QueryInterface = { page: page, limit: 4 };
  if (entityName == "events")
    queryParams = { ...queryParams, applicationId: parentId };
  else if (entityName == "notifications")
    queryParams = { ...queryParams, eventId: parentId };

  return useQuery<ResponseInterface<T>, Error, ResponseInterface<T>>({
    queryKey: parentId ? [entityName, page, parentId] : [entityName, page],
    queryFn: () =>
      service.getAll({
        params: queryParams,
      }),
    staleTime: ms("10m"),
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });
};

export default useData;

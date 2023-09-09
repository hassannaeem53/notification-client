import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import appService from "../services/appService";

export interface App {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
}

const useApps = (page: number) => {
  return useQuery<App[], Error>({
    queryKey: ["apps", page],
    queryFn: () =>
      appService.getAll({
        params: {
          current_page: page,
          page_size: 4,
        },
      }),
    staleTime: ms("24h"),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      return allPages.length - 1;
    },
  });
};

export default useApps;


// import { useQuery } from "@tanstack/react-query";
// import appService, { App } from "../../services/appService";
// import { ResponseInterface } from "../../services/httpService";
// import ms from "ms";


// const useApps = (page: number) => {
//   return useQuery<ResponseInterface<App>, Error, ResponseInterface<App>>({
//     queryKey: ["apps", page],
//     queryFn: () =>
//       appService.getAll({
//         params: {
//           page: page,
//           limit: 4,
//         },
//       }),
//     staleTime: ms("24h"),
//     keepPreviousData: true,
//   });
// };

// export default useApps;

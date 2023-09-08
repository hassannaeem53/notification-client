import { useMutation, useQueryClient } from "@tanstack/react-query";
import appService from "../services/appService";
import { App } from "./useApps";

const useDeleteApp = (page: number, onDelete: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: appService.delete,

    onMutate: (id: number) => {
      const previousAppsData =
        queryClient.getQueryData<App[]>(["apps", page]) || [];

      queryClient.setQueryData<App[]>(["apps", page], (apps) =>
        apps?.map((app) => (app.id == id ? { ...app, is_active: false } : app))
      );

      onDelete();

      return { previousAppsData };
    },

    onError: (error, id, context) => {
      if (!context) return;
      queryClient.setQueryData<App[]>(["apps", page], context.previousAppsData);
    },
  });
};

export default useDeleteApp;

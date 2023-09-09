import { useMutation, useQueryClient } from "@tanstack/react-query";
import appService from "../services/appService";
import { App } from "./useApps";
import { UpdateEntity } from "../services/httpService";

interface UpdateObj {
  id: number;
  entity: UpdateEntity[];
}

const useModifyApp = (page: number, onUpdate?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, entity }: UpdateObj) => appService.update(id, entity),

    onMutate: ({ id, entity }: UpdateObj) => {
      const previousAppsData =
        queryClient.getQueryData<App[]>(["apps", page]) || [];

      queryClient.setQueryData<App[]>(["apps", page], (apps) =>
        apps?.map((app) => (app.id === id ? { ...app, ...entity[0] } : app))
      );

      return { previousAppsData };
    },

    onSuccess: () => {
      onUpdate && onUpdate();
    },

    onError: (error, id, context) => {
      if (!context) return;
      queryClient.setQueryData<App[]>(["apps", page], context.previousAppsData);
    },
  });
};

export default useModifyApp;

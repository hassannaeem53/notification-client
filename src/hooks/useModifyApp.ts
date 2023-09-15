import { useMutation, useQueryClient } from "@tanstack/react-query";
import appService, { App } from "../services/appService";
import { ResponseInterface, UpdateEntity } from "../services/httpService";

interface UpdateObj {
  id: string;
  entity: UpdateEntity;
}

const useModifyApp = (page: number, onUpdate?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, entity }: UpdateObj) => appService.update(id, entity),

    onMutate: ({ id, entity }: UpdateObj) => {
      const previousAppsData =
        queryClient.getQueryData<ResponseInterface<App>>(["apps", page]) || [];

      queryClient.setQueryData<ResponseInterface<App>>(
        ["apps", page],
        (data) => {
          const newApps = data?.applications?.map((app: App) =>
            app._id == id ? { ...app, ...entity } : app
          );
          return { ...data, applications: newApps };
        }
      );

      return { previousAppsData };
    },

    onSuccess: () => {
      onUpdate && onUpdate();
    },

    onError: (_error, _id, context) => {
      if (!context) return;
      queryClient.setQueryData(["apps", page], context.previousAppsData);
    },
  });
};

export default useModifyApp;

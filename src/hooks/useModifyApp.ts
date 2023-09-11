import { useMutation, useQueryClient } from '@tanstack/react-query';
import appService from '../services/appService';
import { App, AppInterface } from './useApps';
import { UpdateEntity } from '../services/httpService';

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
        queryClient.getQueryData<AppInterface>(['apps', page]) || [];

      queryClient.setQueryData<AppInterface>(['apps', page], (data) => {
        const newApps = data?.applications?.map((app) =>
          app._id == id ? { ...app, ...entity } : app
        );
        return { ...data, applications: newApps };
      });

      return { previousAppsData };
    },

    onSuccess: () => {
      onUpdate && onUpdate();
    },

    onError: (error, id, context) => {
      if (!context) return;
      queryClient.setQueryData<App[]>(['apps', page], context.previousAppsData);
    },
  });
};

export default useModifyApp;

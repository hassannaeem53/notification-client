import { useMutation, useQueryClient } from '@tanstack/react-query';
import appService from '../services/appService';
import { App, AppInterface } from './useApps';

const useDeleteApp = (page: number, onDelete: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: appService.update,

    onMutate: (id: string) => {
      const previousAppsData =
        queryClient.getQueryData<App[]>(['apps', page]) || [];

      queryClient.setQueryData<AppInterface>(['apps', page], (data) => {
        const newApps = data?.applications?.map((app) =>
          app._id == id ? { ...app, ...entity } : app
        );
        return { ...data, applications: newApps };
      });

      return { previousAppsData };
    },
    onSuccess: () => onDelete(),

    onError: (error, id, context) => {
      if (!context) return;
      queryClient.setQueryData<App[]>(['apps', page], context.previousAppsData);
    },
  });
};

export default useDeleteApp;

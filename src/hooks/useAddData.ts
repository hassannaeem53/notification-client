import { useMutation, useQueryClient } from "@tanstack/react-query";
import HttpService, { ResponseInterface } from "../services/httpService";
import { AxiosError } from "axios";

const useAddData = <T>(
  entityName: string,
  finalPage: number,
  parentId?: string
) => {
  const queryClient = useQueryClient();
  const service = new HttpService<T>(entityName);

  const key = parentId
    ? [entityName, finalPage, parentId]
    : [entityName, finalPage];

  return useMutation({
    mutationFn: (entity: T) => service.create(entity),

    onMutate: () => {
      const previousData = queryClient.getQueryData<ResponseInterface<T>>(key);

      return { previousData };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },

    onError: (error: AxiosError) => {
      queryClient.invalidateQueries({ queryKey: key });
      return { error };
    },
  });
};

export default useAddData;
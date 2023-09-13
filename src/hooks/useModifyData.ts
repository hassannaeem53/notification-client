import { useMutation, useQueryClient } from "@tanstack/react-query";
import HttpService, {
  ResponseInterface,
  UpdateEntity,
} from "../services/httpService";

interface UpdateObj {
  id: string;
  entity: UpdateEntity;
}

const useModifyData = <T>(
  page: number,
  entityName: string,
  parentId?: string,
  onUpdate?: () => void
) => {
  const queryClient = useQueryClient();
  const service = new HttpService<T>(entityName);

  const key = parentId ? [entityName, page, parentId] : [entityName, page];

  return useMutation({
    mutationFn: ({ id, entity }: UpdateObj) => service.update(id, entity),

    onMutate: ({ id }: UpdateObj) => {
      const previousData = queryClient.getQueryData<ResponseInterface<T>>(key);

      queryClient.setQueryData<ResponseInterface<T>>(key, (oldData) => {
        const newEntitites =
          oldData &&
          oldData[entityName as keyof ResponseInterface<T>]?.map(
            (entity: { _id: string }) =>
              entity._id == id ? { ...entity, ...entity } : entity
          );

        return { ...oldData, [entityName]: newEntitites || [] };
      });

      return { previousData };
    },

    onSuccess: () => {
      onUpdate && onUpdate();
    },

    onError: (_error, _id, context) => {
      if (!context) return;
      queryClient.setQueryData(key, context.previousData);
    },
  });
};

export default useModifyData;

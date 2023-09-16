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
  searchInput: string,
  sort: string,
  sortBy: string,
  parentId?: string,
  onUpdate?: (page?: number) => void
) => {
  const queryClient = useQueryClient();
  const service = new HttpService<T>(entityName);

  const key = parentId
    ? [entityName, page, parentId, searchInput, sort, sortBy]
    : [entityName, page, searchInput, sort, sortBy];
  console.log("🚀 ~ file: useModifyData.ts:22 ~ key:", key);

  return useMutation({
    mutationFn: ({ id, entity }: UpdateObj) => service.update(id, entity),

    onMutate: ({ id }: UpdateObj) => {
      const previousData = queryClient.getQueryData<ResponseInterface<T>>(key);

      return { previousData };
    },

    onSuccess: (_data, variables, context) => {
      const invalidateQueryKey = [...key];
      console.log("context:", context);

      if (
        context?.previousData[entityName]?.length == 1 &&
        variables.entity.is_deleted &&
        page - 1 != 0
      ) {
        invalidateQueryKey[1] = page - 1;

        onUpdate && onUpdate(page - 1);
      }
      if (!variables.entity.is_deleted) onUpdate && onUpdate();

      queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
    },

    onError: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

export default useModifyData;

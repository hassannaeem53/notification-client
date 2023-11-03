import { useMutation, useQueryClient } from "@tanstack/react-query";
import HttpService, {
  ResponseInterface,
  UpdateEntity,
} from "../services/httpService";
import { AxiosError } from "axios";

interface UpdateObj {
  id: string;
  entity: UpdateEntity;
}

const useModifyData = <T>(
  page: number,
  entityName: string,
  active: boolean,
  searchInput: string,
  sort: string,
  sortBy: string,
  parentId?: string,
  onUpdate?: (page?: number) => void
) => {
  const queryClient = useQueryClient();
  const service = new HttpService<T>(entityName);

  const key = parentId
    ? [entityName, page, active, parentId, searchInput, sort, sortBy]
    : [entityName, page, active, searchInput, sort, sortBy];

  return useMutation({
    mutationFn: ({ id, entity }: UpdateObj) => service.update(id, entity),

    onMutate: () => {
      const previousData = queryClient.getQueryData<ResponseInterface<T>>(key);

      return { previousData };
    },

    onSuccess: (_data, variables, context) => {
      const invalidateQueryKey = [...key];

      if (
        context?.previousData[entityName]?.length == 1 &&
        variables.entity.is_deleted &&
        page - 1 != 0
      ) {
        invalidateQueryKey[1] = page - 1;
        onUpdate && onUpdate(page - 1);
      } else if (variables.entity.is_deleted) {
        onUpdate && onUpdate(page);
      }

      //for handling toggle
      if (
        !variables.entity.is_deleted &&
        context?.previousData[entityName]?.length !== 1
      )
        onUpdate && onUpdate(page);
      else if (
        !variables.entity.is_deleted &&
        context?.previousData[entityName]?.length == 1
      )
        onUpdate && onUpdate(page - 1);

      queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
    },

    onError: (error: AxiosError) => {
      queryClient.invalidateQueries({ queryKey: key });
      return { error };
    },
  });
};

export default useModifyData;

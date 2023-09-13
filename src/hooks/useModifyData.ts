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
  onUpdate?: (page: number) => void
) => {
  const queryClient = useQueryClient();
  const service = new HttpService<T>(entityName);

  const key = parentId ? [entityName, page, parentId] : [entityName, page];

  return useMutation({
    mutationFn: ({ id, entity }: UpdateObj) => service.update(id, entity),

    onMutate: ({ id }: UpdateObj) => {
      const previousData = queryClient.getQueryData<ResponseInterface<T>>(key);

      const invalidateQueryKey = [...key];
      if (previousData[entityName]?.length == 1) {
        invalidateQueryKey[1] = page - 1;
        onUpdate && onUpdate(page - 1);
      }

      queryClient.invalidateQueries({ queryKey: invalidateQueryKey });

      return { previousData };
    },

    onSuccess: () => {
      //   console.log("🚀 ~ file: useModifyData.ts:44 ~ context:", context);
      //   onUpdate && onUpdate();
      //   const invalidateQueryKey = [...key];
      //   if (context?.previousData[entityName]?.length == 1) {
      //     invalidateQueryKey[1] = page - 1;
      //     onUpdate && onUpdate(page - 1);
      //   }
      //   queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
    },

    onError: () => {
      //   if (!context) return;
      //   queryClient.setQueryData(key, context.previousData);
      queryClient.invalidateQueries({ queryKey: key });

      console.log("err occured");
    },
  });
};

export default useModifyData;

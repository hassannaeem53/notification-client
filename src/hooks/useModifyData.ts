import { CanceledError } from "axios";
import { useState } from "react";
import HttpService, { UpdateEntity } from "../services/httpService";

const useModifyData = <T>(
  serviceInstance,
  entity: UpdateEntity,
  id: number
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const serviceInstance = new HttpService(endpoint);
  serviceInstance
    .update<T>(id, [entity])
    .then((res) => {
      setData(res.data);
      setLoading(false);
    })
    .catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.response.data.message);
      setLoading(false);
    });

  return { data, error, isLoading };
};

export default useModifyData;

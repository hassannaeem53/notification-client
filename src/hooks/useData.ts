import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import HttpService from "../services/httpService";

const useData = <T>(
  // endpoint: string,
  serviceInstance: HttpService,
  requestConfig?: AxiosRequestConfig,
  deps?: unknown[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      setLoading(true);
      // const serviceInstance = new HttpService(endpoint);
      const { request, cancel } = serviceInstance.getAll<T>(requestConfig);
      request
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => cancel();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;

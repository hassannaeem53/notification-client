import { AxiosRequestConfig, CanceledError } from 'axios';
import { useEffect, useState, useRef } from 'react';
import apiClient from '../services/apiClient';

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: unknown[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  // Use a ref to store the previous data
  const prevDataRef = useRef<T[]>([]);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);
      apiClient
        .get<T[]>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          prevDataRef.current = data; // Store the previous data
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  // Return the previous data until new data is available
  const previousData = isLoading ? prevDataRef.current : data;

  return { data: previousData, error, isLoading };
};

export default useData;

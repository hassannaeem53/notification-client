import { AxiosRequestConfig } from "axios";
import apiClient from "./apiClient";

export interface Entity {
  id: number;
}

export interface UpdateEntity {
  name?: string;
  description?: string;
  is_active?: boolean;
}

class HttpService<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = (requestConfig?: AxiosRequestConfig) => {
    const controller = new AbortController();
    return apiClient
      .get<T[]>(this.endpoint, {
        signal: controller.signal,
        ...requestConfig,
      })
      .then((res) => res.data);
  };

  delete = (id: number) => {
    return apiClient
      .delete<T[]>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };

  create = (entity: T) => {
    return apiClient.post<T[]>(this.endpoint, entity).then((res) => res.data);
  };

  update = (id: number, entity: UpdateEntity[]) => {
    return apiClient
      .patch<T[]>(this.endpoint + "/" + id, entity)
      .then((res) => res.data);
  };
}

export default HttpService;

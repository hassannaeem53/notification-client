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

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = <T>(requestConfig?: AxiosRequestConfig) => {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
      ...requestConfig,
    });
    return { request, cancel: () => controller.abort() };
  };

  delete = (id: number) => {
    return apiClient.delete(this.endpoint + "/" + id);
  };

  create = <T>(entity: T) => {
    return apiClient.post<T[]>(this.endpoint, entity);
  };

  update = <T>(id: number, entity: UpdateEntity[]) => {
    return apiClient.patch<T[]>(this.endpoint + "/" + id, entity);
  };
}

export default HttpService;

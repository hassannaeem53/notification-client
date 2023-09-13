import { AxiosRequestConfig } from "axios";
import apiClient from "./apiClient";

export interface Entity {
  id: number;
}

export interface UpdateEntity {
  name?: string;
  description?: string;
  is_active?: boolean;
  is_deleted?: boolean;
}

export interface ResponseInterface<T> {
  applications?: T[];
  events?: T[];
  notifications?: T[];

  pagination?: {
    totalPages: number;
    pageSize: number;
    currentPage: number;
    totalCount: number;
  };
}

class HttpService<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = (requestConfig?: AxiosRequestConfig) => {
    const controller = new AbortController();
    return apiClient
      .get<ResponseInterface<T>>(this.endpoint, {
        signal: controller.signal,
        ...requestConfig,
      })
      .then((res) => res.data);
  };

  create = (entity: T) => {
    return apiClient.post<T>(this.endpoint, entity).then((res) => res.data);
  };

  update = (id: string, entity: UpdateEntity) => {
    return apiClient
      .patch<T>(this.endpoint + "/" + id, entity)
      .then((res) => res.data);
  };
}

export default HttpService;

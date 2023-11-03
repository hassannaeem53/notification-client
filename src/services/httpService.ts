import { AxiosRequestConfig } from "axios";
import apiClient from "./apiClient";
import { App } from "./appService";

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

interface Event {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
  applicationId: string;
}

interface Notification {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
  eventId: string;
}

export interface UpdateResponseInterface {
  applications?: App;
  events?: Event;
  notifications?: Notification;
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
    return apiClient
      .post<T | string>(this.endpoint, entity)
      .then((res) => res.data);
  };

  update = (id: string, entity: UpdateEntity) => {
    return apiClient
      .patch<UpdateResponseInterface>(this.endpoint + "/" + id, entity)
      .then((res) => res.data);
  };
}

export default HttpService;

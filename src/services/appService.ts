import HttpService from "./httpService";

export interface App {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface AppInterface {
  applications: App[] | undefined;
  pagination?:
    | {
        totalPages: number;
        pageSize: number;
        currentPage: number;
        totalCount: number;
      }
    | undefined;
}

export default new HttpService<AppInterface>("/xapplications");

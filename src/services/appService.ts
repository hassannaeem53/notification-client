import HttpService from "./httpService";

export interface App {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export default new HttpService<App>("/applications");

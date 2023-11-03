import HttpService from './httpService';

export interface App {
  _id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export default new HttpService<App>('/applications');

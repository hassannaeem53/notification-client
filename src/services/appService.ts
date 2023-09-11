import { App } from '../hooks/useApps';
import HttpService from './httpService';

export default new HttpService<App>('/applications');

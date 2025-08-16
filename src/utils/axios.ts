import Axios from 'axios';

export const mockAxios = Axios.create({ baseURL: '/api' });

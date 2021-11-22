import {request} from '../utils/request';

export const login = ({phone, password}) => request(`/login/cellphone?phone=${phone}&password=${password}`);
import { request } from "../utils/request";

export const login = ({
  phone,
  password,
}: {
  phone: string;
  password: string;
}) =>
  request(
    `/login/cellphone?phone=${phone}&password=${password}`
  ) as Promise<any>;

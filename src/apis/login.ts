import { request } from "../utils/request";

export const getQrKey = () =>
  request(`/login/qr/key?timerstamp=${new Date().getTime()}`) as Promise<any>;

export const getLoginState = () =>
  request(`/login/status?timerstamp=${new Date().getTime()}`) as Promise<any>;

export const logOut = () =>
  request(`/logout?timerstamp=${new Date().getTime()}`) as Promise<any>;

export const getQrCode = ({ key }: { key: string }) =>
  request(`/login/qr/create?key=${key}&qrimg=true`) as Promise<any>;

export const checkQrState = ({ key }: { key: string }) =>
  request(
    `/login/qr/check?key=${key}&timerstamp=${new Date().getTime()}`
  ) as Promise<any>;

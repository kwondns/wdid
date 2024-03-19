import axios, { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';

import isTokenExpired from '@/libs/token.lib';

export const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL,
  withCredentials: true,
});

export const setUpInterceptor = (redirection: NavigateFunction) =>
  axiosAPI.interceptors.request.use(async (config) => {
    if (config.method && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(config.method.toUpperCase())) {
      let accessToken = localStorage.getItem('accessToken');
      if (!accessToken || isTokenExpired(accessToken)) {
        try {
          const response = await axios.post<{ accessToken: string }>(
            `${import.meta.env.VITE_API_SERVER_URL}/admin/refresh`,
            {},
            { withCredentials: true },
          );
          accessToken = `Bearer ${response.data.accessToken}`;
          localStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        } catch (error) {
          if (error instanceof AxiosError && error.response?.status === 401) {
            redirection('/auth');
            return Promise.reject(error);
          }
        }
      }
      if (accessToken) config.headers.Authorization = accessToken;
    }
    return config;
  });

axiosAPI.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        throw new Error('요청 형식이 잘못되었습니다!');
      } else if (status === 401) {
        throw new Error('인증이 필요합니다!');
      } else if (status === 403) {
        throw new Error('정보를 찾을 수 없습니다!');
      } else throw new Error('오류가 발생했습니다!');
    }
  },
);

export const PostFetch = async <B, R>(url: string, body: B, isAuth?: boolean): Promise<R> => {
  if (isAuth) {
    return axios.post(`${import.meta.env.VITE_API_SERVER_URL}/${url}`, body);
  }
  const result = await axiosAPI.post<R>(url, body);
  return result.data;
};

export const GetFetch = async <T>(url: string): Promise<T> => {
  const result = await axiosAPI.get(url);
  return result.data;
};

export const PutFetch = async <B, R>(url: string, body: B): Promise<R> => {
  const result = await axiosAPI.put<R>(url, body);
  return result.data;
};

export const PatchFetch = async <B, R>(url: string, body: B, accessToken?: string): Promise<R> => {
  const headers = { 'Content-type': 'application/json' };
  if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });
  const result = await axiosAPI.patch<R>(`${import.meta.env.VITE_API_SERVER_URL}/${url}`, body);
  return result.data;
};

export const FileUpload = async (target: string, payload: File[] | File, uri?: string, num?: number) => {
  const formData = new FormData();

  if (payload instanceof Array) payload.forEach((file, index) => formData.append(`file-${index}`, file));
  else formData.append('file', payload);

  if (uri) formData.append('uri', `${uri.replaceAll(' ', '_').replaceAll('(', '<').replaceAll(')', '>')}/`);
  formData.append('num', num ? String(num) : '1');

  const result = await axiosAPI.postForm(`${import.meta.env.VITE_API_SERVER_URL}/upload/${target}`, formData);
  return result.data;
};

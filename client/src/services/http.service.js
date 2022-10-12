import axios from 'axios';
import localStorageService from './local.storage.service';
import authService from './auth.service';
import configFile from '../config.json';
import { toast } from 'react-toastify';

const http = axios.create({
  baseURL: configFile.apiEndPoint,
});

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && expiresDate < Date.now();

    if (configFile.isFirebase) {
      const containSlash = /\/$/.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json';

      if (isExpired) {
        const data = await authService.refresh();

        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          localId: data.user_id,
          expiresIn: data.expires_in,
        });
      }

      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      }
    } else {
      if (isExpired) {
        const data = await authService.refresh();

        localStorageService.setTokens({
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
          userId: data.userId,
          expiresIn: data.expiresIn,
        });
      }

      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data && !data._id ? Object.keys(data).map((key) => ({ ...data[key] })) : data;
}

http.interceptors.response.use(
  async function (res) {
    if (configFile.isFirebase) {
      res.data = { content: transformData(res.data) };
    } else {
      res.data = { content: res.data };
    }
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
      console.log(error);
      toast.error('Something was wrong. Please, try again later.');
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;

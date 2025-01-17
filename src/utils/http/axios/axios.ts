import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class AxiosHttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  /**
   * @description Rest APIs
   */

  async get<T>(url: string): Promise<API.Response<T>> {
    const { data }: AxiosResponse<API.SuccessResponse<T>> = await this.axiosInstance.get(url);
    return data;
  }

  async post<T>(url: string, params?: object | string): Promise<API.Response<T>> {
    const { data }: AxiosResponse<API.SuccessResponse<T>> = await this.axiosInstance.post(url, params);
    return data;
  }
}

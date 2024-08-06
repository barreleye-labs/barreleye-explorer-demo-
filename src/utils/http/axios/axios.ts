import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class AxiosHttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  /**
   * @description Rest APIs
   */

  async get<T>(url: string): Promise<API.Response<T>> {
    try {
      const { data }: AxiosResponse<API.SuccessResponse<T>> = await this.axiosInstance.get(url);
      // console.log('axios response :: ', data);
      return data;
    } catch (error) {
      console.error('axios error response :: ', this.extractErrorResponse(error as AxiosError));
      return this.handleError(error as AxiosError);
    }
  }

  async post<T>(url: string, params?: object | string): Promise<API.Response<T>> {
    try {
      const { data }: AxiosResponse<API.SuccessResponse<T>> = await this.axiosInstance.post(url, params);
      // console.log('axios response :: ', data);
      return data;
    } catch (error) {
      console.error('axios error response :: ', this.extractErrorResponse(error as AxiosError));
      return this.handleError(error as AxiosError);
    }
  }

  private handleError(error: AxiosError): API.ErrorResponse {
    if (!error.response) {
      return { data: undefined as never, statusCode: 503, error: { message: 'Service Unavailable' } };
    }
    if (error.response.status === 500) {
      return { data: undefined as never, statusCode: 500, error: { message: 'Server error' } };
    }
    return {
      data: undefined as never,
      statusCode: error.response.status,
      error: { message: error.response.data.error.message }
    };
  }

  private extractErrorResponse(error: AxiosError): API.ErrorResponse | { message: string } {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data.error;
    }
    return { message: 'Unknown error occurred' };
  }
}

declare namespace API {
  interface Response<T = never> {
    data: T;
    statusCode: number;
    error?: Error;
  }

  interface Error {
    message: string;
  }
}

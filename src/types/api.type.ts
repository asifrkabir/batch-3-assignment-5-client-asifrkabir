export type TSuccessApiResponse<T> = {
  success: true;
  statusCode: number;
  message: string;
  token?: string;
  data: T;
};

export type TErrorApiResponse = {
  success: false;
  statusCode: number;
  message: string;
  errorSources?: Array<{ path: string; message: string }>;
  stack?: string;
};

export type TApiResponse<T> = TSuccessApiResponse<T> | TErrorApiResponse;

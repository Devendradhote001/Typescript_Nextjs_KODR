export interface IApiResponse<T = null | object> {
  success: boolean;
  message: string;
  data?: T;
  error?: T;
}

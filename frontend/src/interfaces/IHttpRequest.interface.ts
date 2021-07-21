interface IHttpRequest{
  url: string;
  body?: any;
  customHeaders?: object;
  params?: object;
  token?: string;
}

export default IHttpRequest
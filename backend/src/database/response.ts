

/**
 * This is the default api response that should be used when returning responses.
 * It has 2 default attriubutes
 * "status" [success, fail, error]. If it is success everything went correct and
 * a data attribute is provided.
 * if fail the user has done someting wrong and in the data there is the data about
 * what went wrong.
 * If error something happened on the server and a message is provided explaining what happend.
 */
export default class ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;

  constructor(params: { data?: T; status?: string; message?: string }) {
    this.status = params.status ? params.status : "success" ;
    this.message = params.message;
    this.data = params.data;
  }

  static error(message:string): ApiResponse<string> {
    return new ApiResponse({status:"error",message:message})
  }
}

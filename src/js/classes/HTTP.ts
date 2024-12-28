import axios from "axios";
const isProd = process.env.NODE_ENV === "production";

export default class HTTP {
  constructor() {}
  static async sendAjax(
    url: string,
    data: any,
    successCallback: any,
    errorCallback: any
  ) {
    const method = isProd ? "post" : "get";
    // const method = "post";
    try {
      const response = await axios({
        method,
        url,
        data,
      });
      const dataResponse = response;

      if (dataResponse.status) {
        successCallback ? successCallback(dataResponse.data) : "";
      } else {
        errorCallback ? errorCallback(dataResponse) : "";
      }
      return response;
    } catch (error) {
      errorCallback ? errorCallback(error) : "";
      // console.error(error);
    }
  }
}

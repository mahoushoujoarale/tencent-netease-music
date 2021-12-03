import axios from "axios";
import { message } from "antd";

export const BaseURL: string = "http://localhost:4000";
// export const BaseURL: string = "http://47.98.238.202:4000";

axios.defaults.baseURL = BaseURL;

axios.defaults.withCredentials = true;

export function request(
  url: string,
  data: object = {},
  method: string = "get"
) {
  return new Promise((resolve, reject) => {
    if (method.toLowerCase() === "get") {
      axios
        .get(url, {
          params: data,
        })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((error) => {
          message.warn("网络出现问题: " + error.message);
          // reject(error)
        });
    } else if (method.toLowerCase() === "post") {
      axios
        .post(url, data)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((error) => {
          message.warn("网络出现问题: " + error.message);
          // reject(error)
        });
    }
  });
}

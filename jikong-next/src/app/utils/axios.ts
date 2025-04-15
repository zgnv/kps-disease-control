import axios from "axios";
import qs from "qs";

let baseURL;
if (process.env.NODE_ENV === "production") {
  baseURL = "http://139.226.106.20:8099/";
} else {
  baseURL = "http://139.226.106.20:8099/";
}

axios.defaults.withCredentials = true;
// 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.request.use(
  (config) => {
    console.log(config);
    config.headers["Accept"] = "application/vnd.dpexpo.v1+json";
    config.baseURL = baseURL;
    config.timeout = 10000;
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      if (
        config.headers["Content-Type"] === "application/x-www-form-urlencoded"
      ) {
        config.data = qs.stringify(config.data);
      }
    }
    // 若是有做鉴权token , 就给头部带上token
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios的get请求
export function getAxios({ url = "", params = {} }) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err, "1");
        reject(err);
      });
  });
}

// axios的post请求
export function postAxios({ url = "", data = {} }) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: "post",
      data,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default axios;

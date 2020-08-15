import axios from "axios";
const URL_API = "https://dev-data-tools-api-golang.herokuapp.com";

export const api = axios.create({
  baseURL: URL_API
});

// api.interceptors.request.use(
//     config => {
//       const token = sessionStorage.getItem('@ContaSoma-Token');
//       if (token) {
//         config.headers['Authorization'] = token;
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
// );

api.interceptors.request.use(config => {
  // config.headers["Content-Tyoe"] = "application/x-www-form-urlencoded";
  return config;
});

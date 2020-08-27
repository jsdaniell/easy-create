import axios from "axios";
// const URL_API = "https://dev-data-tools-api-golang.herokuapp.com";
const URL_API = "http://localhost:9000";

export const api = axios.create({
  baseURL: URL_API
});


api.interceptors.request.use(
    request => {

      let ls = JSON.parse(localStorage.getItem('persist:root'))

      if (ls && ls.userUidReducer) {

        let user = ls.userUidReducer.split('"').join("");

        request.headers['Authorization'] = user;
        return request;
      }

    },
    error => {

      return Promise.reject(error);
    }
);



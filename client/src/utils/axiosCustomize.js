// về sau có thay đổi đường link back end thì chỉ cần sửa 1 nơi thôi
import axios from "axios";
import NProgress from "nprogress";
// khi nào gọi API thì bật thanh load lên, xong thì tắt đi
// vì có nhiều nơi sẽ gọi API nên chỉ để trong axios này, tránh bị lặp lại nhiều lần

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

// Add a request interceptor
instance.interceptors.request.use(
  // truoc khi gui request API

  function (config) {
    NProgress.start();
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log("interceptor", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();

    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error, nếu mã lỗi phản hồi từ backend thì nó sẽ trả về client
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);
// kiểm tra nếu ko có thì báo lỗi ra màn hình
// tác dụng của axios, trước khi về đến tay ng dùng phải customize axios
// nếu có mã lỗi từ server thì sẽ báo ra màn hình

export default instance;

import axios from "axios";
axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("authToken");
    if (!config.noauth)
      if (token) {
        config.headers = {
          authorization: `Bearer ${token}`,
          Accept: "application/json",

          // "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // credentials: "same-origin",
        };
      }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log("int res");
    const config = error.config;

    if (error.response.status === 401 && !config._retry) {
      localStorage.clear();
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

import axios from 'axios';

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("jwt");
        if (token) {
            config.headers["Content-Type"] = "application/json";
            config.headers["Authorization"] = `Bearer ${token}`;
            console.log(config.headers["Authorization"]);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


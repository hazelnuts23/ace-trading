import axios from 'axios';

/**
 * Create a base axios
 */
const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

/**
 * Intercept any api call, if it return 401 Unauthorised, immediately clear local storage and redirect to /login
 */
axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        if (res.status === 401) {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) localStorage.clear();
            window.location.href = "/login";
        }
        console.error(`“Looks like there was a problem. Status Code: “` + res.status);
        return Promise.reject(error);
    }
);

export default axiosClient;

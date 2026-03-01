import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://tuitionhub-rho.vercel.app/api/v1"
})

export default apiClient;
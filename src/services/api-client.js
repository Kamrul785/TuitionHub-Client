import axios from "axios";

export default axios.create({
    baseURL: "https://tuitionhub-rho.vercel.app/api/v1"
})
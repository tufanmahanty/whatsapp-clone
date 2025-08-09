import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BACKEND_URI
})

export default api
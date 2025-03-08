import axiosInstance from "../axiosInstance.js";

const login = async (email, password) => {
    const response = await axiosInstance.post('/login', {email, password});
    return response.data;
}

export{ login };
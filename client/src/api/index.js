import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const getboards = (userId) => API.get(`/user/${userId}/boards`);
export const createboard = (userId, BoardFormData) =>
    API.post(`/user/${userId}/createboard`, BoardFormData);
export const deleteboard = (userId, boardId) =>
    API.post(`/user/${userId}/deleteboard`, { boardId: boardId });

export const editboard = (userId, boardId, BoardData) =>
    API.post(`/user/${userId}/${boardId}/editboard`, BoardData);

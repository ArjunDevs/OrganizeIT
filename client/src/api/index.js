import axios from "axios";

const AuthAPI = axios.create({ baseURL: "https://organize-it-jet.vercel.app" });

const API = axios.create({ baseURL: "https://organize-it-jet.vercel.app" });

API.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("profile")).token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const signIn = (formData) => AuthAPI.post("/auth/signin", formData);
export const signUp = (formData) => AuthAPI.post("/auth/signup", formData);

export const getboards = (userId) => API.get(`/user/${userId}/boards`);
export const createboard = (userId, BoardFormData) =>
    API.post(`/user/${userId}/createboard`, BoardFormData);
export const deleteboard = (userId, boardId) =>
    API.post(`/user/${userId}/deleteboard`, { boardId: boardId });

export const editboard = (userId, boardId, BoardData) =>
    API.post(`/user/${userId}/${boardId}/editboard`, BoardData);

export const gettasklists = (boardId) =>
    API.get(`/board/${boardId}/gettasklists`);

export const createtasklist = (boardId, TaskListData) =>
    API.post(`/board/${boardId}/createTaskList`, TaskListData);

export const edittasklist = (boardId, taskListId, taskListdata) =>
    API.post(`/board/${boardId}/${taskListId}/edittasklist`, taskListdata);

export const deletetasklist = (boardId, tasklistId) =>
    API.post(`/board/${boardId}/deletetasklist`, { taskListId: tasklistId });

export const gettasks = (taskListId) =>
    API.get(`/tasklist/${taskListId}/gettasks`);

export const createtask = (taskListId, TaskData) =>
    API.post(`/tasklist/${taskListId}/createtask`, TaskData);

export const edittask = (tasklistId, taskId, taskFormData) =>
    API.post(`/tasklist/${tasklistId}/${taskId}/edittask`, taskFormData);

export const deletetask = (tasklistId, taskId) =>
    API.post(`/tasklist/${tasklistId}/deletetask`, { taskId });

export const performTaskDragReorder = (
    destinationTaskListId,
    destinationIndex,
    sourceTaskListId,
    sourceIndex,
    draggedTaskId
) =>
    API.post(
        `/tasklist/${sourceTaskListId}/${destinationTaskListId}/dragreordertask`,
        { destinationIndex, sourceIndex, draggedTaskId }
    );

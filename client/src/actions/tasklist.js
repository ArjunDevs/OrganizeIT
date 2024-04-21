import * as api from "../api/index.js";

export const gettasks = (taskListId) => async (dispatch) => {
    try {
        const { data } = await api.gettasks(taskListId);
        dispatch({ type: "GET_ALL_TASKS", data });
    } catch (error) {
        if (error.response) {
            alert("Authentication Expired! please re-Login!");
            dispatch({ type: "SIGNOUT" });
        } else {
            console.log(error);
        }
    }
};

export const createtask = (taskListId, TaskData) => async (dispatch) => {
    try {
        const { data } = await api.createtask(taskListId, TaskData);
        dispatch({ type: "CREATE_TASK", data });
    } catch (error) {
        if (error.response) {
            alert("Authentication Expired! please re-Login!");
            dispatch({ type: "SIGNOUT" });
        } else {
            console.log(error);
        }
    }
};

export const edittask =
    (tasklistId, taskId, taskFormData) => async (dispatch) => {
        try {
            const { data } = await api.edittask(
                tasklistId,
                taskId,
                taskFormData
            );
            dispatch({ type: "EDIT_TASK", data });
        } catch (error) {
            if (error.response) {
                alert("Authentication Expired! please re-Login!");
                dispatch({ type: "SIGNOUT" });
            } else {
                console.log(error);
            }
        }
    };

export const deletetask = (tasklistId, taskId) => async (dispatch) => {
    try {
        const { data } = await api.deletetask(tasklistId, taskId);
        dispatch({ type: "DELETE_TASK", data });
    } catch (error) {
        if (error.response) {
            alert("Authentication Expired! please re-Login!");
            dispatch({ type: "SIGNOUT" });
        } else {
            console.log(error);
        }
    }
};

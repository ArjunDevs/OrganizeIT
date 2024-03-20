import * as api from "../api/index.js";

export const gettasklists = (boardId) => async (dispatch) => {
    try {
        const { data } = await api.gettasklists(boardId);
        dispatch({ type: "GET_ALL_TASKLISTS", data });
    } catch (error) {
        console.log(error);
    }
};

export const createtasklist = (boardId, TaskListData) => async (dispatch) => {
    try {
        const { data } = await api.createtasklist(boardId, TaskListData);
        dispatch({ type: "CREATE_TASKLIST", data });
    } catch (error) {
        console.log(error);
    }
};

export const edittasklist =
    (boardId, taskListId, taskListData) => async (dispatch) => {
        try {
            const { data } = await api.edittasklist(
                boardId,
                taskListId,
                taskListData
            );
            dispatch({ type: "EDIT_TASKLIST", data });
        } catch (error) {
            console.log(error);
        }
    };

export const deletetasklist = (boardId, tasklistId) => async (dispatch) => {
    try {
        const { data } = await api.deletetasklist(boardId, tasklistId);
        dispatch({ type: "DELETE_TASKLIST", data });
    } catch (error) {
        console.log(error);
    }
};

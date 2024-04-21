import * as api from "../api/index.js";

export const gettasklists = (boardId) => async (dispatch) => {
    try {
        const { data } = await api.gettasklists(boardId);
        dispatch({ type: "GET_ALL_TASKLISTS", data });
    } catch (error) {
        if (error.response) {
            alert("Authentication Expired! please re-Login!");
            dispatch({ type: "SIGNOUT" });
        } else {
            console.log(error);
        }
    }
};

export const createtasklist = (boardId, TaskListData) => async (dispatch) => {
    try {
        const { data } = await api.createtasklist(boardId, TaskListData);
        dispatch({ type: "CREATE_TASKLIST", data });
    } catch (error) {
        if (error.response) {
            alert("Authentication Expired! please re-Login!");
            dispatch({ type: "SIGNOUT" });
        } else {
            console.log(error);
        }
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
            if (error.response) {
                alert("Authentication Expired! please re-Login!");
                dispatch({ type: "SIGNOUT" });
            } else {
                console.log(error);
            }
        }
    };

export const deletetasklist = (boardId, tasklistId) => async (dispatch) => {
    try {
        const { data } = await api.deletetasklist(boardId, tasklistId);
        dispatch({ type: "DELETE_TASKLIST", data });
    } catch (error) {
        if (error.response) {
            alert("Authentication Expired! please re-Login!");
            dispatch({ type: "SIGNOUT" });
        } else {
            console.log(error);
        }
    }
};

export const performTaskDragReorder =
    (
        destinationTaskListId,
        destinationIndex,
        sourceTaskListId,
        sourceIndex,
        draggedTaskId
    ) =>
    async (dispatch) => {
        try {
            dispatch({
                type: "DRAG_REORDER_TASK",
                payload: {
                    destinationTaskListId,
                    destinationIndex,
                    sourceTaskListId,
                    sourceIndex,
                },
            });
            await api.performTaskDragReorder(
                destinationTaskListId,
                destinationIndex,
                sourceTaskListId,
                sourceIndex,
                draggedTaskId
            );
        } catch (error) {
            if (error.response) {
                alert("Authentication Expired! please re-Login!");
                dispatch({ type: "SIGNOUT" });
            } else {
                console.log(error);
            }
        }
    };

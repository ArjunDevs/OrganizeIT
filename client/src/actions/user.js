import * as api from "../api/index.js";

export const getboards = (userId) => async (dispatch) => {
    try {
        const { data } = await api.getboards(userId);
        dispatch({ type: "GET_ALL_BOARDS", data });
    } catch (error) {
        console.log(error);
    }
};

export const createboard = (userId, BoardFormdata) => async (dispatch) => {
    try {
        const { data } = await api.createboard(userId, BoardFormdata);
        dispatch({ type: "CREATE_BOARD", data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteboard = (userId, boardId) => async (dispatch) => {
    try {
        const { data } = await api.deleteboard(userId, boardId);
        dispatch({ type: "DELETE_BOARD", data });
    } catch (error) {
        console.log(error);
    }
};

export const editboard = (userId, boardId, BoardData) => async (dispatch) => {
    try {
        const { data } = await api.editboard(userId, boardId, BoardData);
        dispatch({ type: "EDIT_BOARD", data });
    } catch (error) {
        console.log(error);
    }
};

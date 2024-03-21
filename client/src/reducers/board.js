export const BoardReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALL_TASKLISTS":
            return { ...state, [action?.data.boardId]: action?.data.tasklists };
        case "CREATE_TASKLIST":
            return { ...state, [action?.data.boardId]: action?.data.tasklists };
        case "EDIT_TASKLIST":
            return { ...state, [action?.data.boardId]: action?.data.tasklists };
        case "DELETE_TASKLIST":
            return { ...state, [action?.data.boardId]: action?.data.tasklists };
        default:
            return state;
    }
};

export const BoardReducer = (state = { TaskLists: [] }, action) => {
    switch (action.type) {
        case "GET_ALL_TASKLISTS":
            return { ...state, TaskLists: action?.data.tasklists };
        case "CREATE_TASKLIST":
            return { ...state, TaskLists: action?.data.tasklists };
        case "EDIT_TASKLIST":
            return { ...state, TaskLists: action?.data.tasklists };
        case "DELETE_TASKLIST":
            return { ...state, TaskLists: action?.data.tasklists };
        default:
            return state;
    }
};

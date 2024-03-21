export const TaskListReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_ALL_TASKS":
            return { ...state, [action?.data.tasklistId]: action?.data.tasks };
        case "CREATE_TASK":
            return { ...state, [action?.data.tasklistId]: action?.data.tasks };
        case "EDIT_TASK":
            return { ...state, [action?.data.tasklistId]: action?.data.tasks };
        case "DELETE_TASK":
            return { ...state, [action?.data.tasklistId]: action?.data.tasks };
        default:
            return state;
    }
};

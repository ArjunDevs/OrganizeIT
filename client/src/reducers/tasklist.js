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
        case "DRAG_REORDER_TASK":
            const {
                destinationTaskListId,
                destinationIndex,
                sourceTaskListId,
                sourceIndex,
            } = action.payload;

            const newState = { ...state };

            const sourceTasks = newState[sourceTaskListId];

            if (sourceTaskListId === destinationTaskListId) {
                const [draggedTask] = sourceTasks.splice(sourceIndex, 1);
                sourceTasks.splice(destinationIndex, 0, draggedTask);
            } else {
                const destinationTasks = newState[destinationTaskListId];
                const [draggedTask] = sourceTasks.splice(sourceIndex, 1);
                destinationTasks.splice(destinationIndex, 0, draggedTask);
            }

            return newState;

        default:
            return state;
    }
};

export const UserReducer = (state = { Userboards: [] }, action) => {
    switch (action.type) {
        case "GET_ALL_BOARDS":
            return { ...state, Userboards: action?.data.boards };
        case "CREATE_BOARD":
            return { ...state, Userboards: action?.data.boards };
        case "DELETE_BOARD":
            return { ...state, Userboards: action?.data.boards };
        case "EDIT_BOARD":
            return { ...state, Userboards: action?.data.boards };
        default:
            return state;
    }
};

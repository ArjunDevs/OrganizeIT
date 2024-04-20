export const Authreducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case "SIGNIN":
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action?.data })
            );
            return { ...state, authData: action.data };
        case "SIGNUP":
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action?.data })
            );
            return { ...state, authData: action.data };

        case "SIGNOUT":
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
};

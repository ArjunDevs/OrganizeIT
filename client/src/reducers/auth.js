export const Authreducer = (state = [], action) => {
    switch (action.type) {
        case "SIGNIN":
            console.log("in signin reducer");
            console.log({ ...action?.data });
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
        default:
            return state;
    }
};

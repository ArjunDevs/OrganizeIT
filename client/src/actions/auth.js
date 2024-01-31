import * as api from "../api/index.js";

export const signin = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: "SIGNIN", data });
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: "SIGNUP", data });
    } catch (error) {
        console.log(error);
    }
};

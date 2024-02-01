import * as api from "../api/index.js";

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: "SIGNIN", data });
        navigate("/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: "SIGNUP", data });
        navigate("/dashboard");
    } catch (error) {
        console.log(error);
    }
};

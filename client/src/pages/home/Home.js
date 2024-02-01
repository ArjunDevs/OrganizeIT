import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem("profile");
        if (user) {
            const decodedToken = jwtDecode(JSON.parse(user)["token"]);
            let currentTime = new Date();
            if (decodedToken?.exp * 1000 > currentTime.getTime()) {
                //valid
                navigate("/dashboard");
            } else {
                //dispatch a logout action.
                dispatch({ type: "SIGNOUT" });
            }
        }
    }, [navigate, dispatch]);

    return (
        <div>
            <h1>This is home</h1>
            <h5>
                to go to Login page : <Link to="/auth">Click Here</Link>
            </h5>
        </div>
    );
};

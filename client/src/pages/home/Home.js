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
        <div className="bg-gray-800 min-h-screen pt-16 flex flex-row justify-between">
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="bg-gray-700 w-3/4 h-3/4 flex flex-col rounded-xl items-center justify-center">
                    <p className="text-4xl font-mono font-extrabold text-center text-gray-300">
                        Welcome!
                    </p>
                    <p className="text-2xl font-mono font-extrabold text-center text-gray-300">
                        Manage Your Tasks Easily and Efficiently
                    </p>
                </div>
            </div>
            <div className="border border-gray-300 my-12 px-1/2"></div>
            <div className="w-1/2 flex items-center justify-center">
                <div className="bg-gray-700 w-3/4 h-3/4 flex flex-col rounded-xl items-center justify-center">
                    <h5 className="text-xl font-mono font-extrabold text-center text-gray-300">
                        Click Here to Get Started :{" "}
                        <Link
                            className="px-3 py-2 rounded bg-gray-300 text-black hover:bg-black hover:text-gray-300 transition-colors duration-300"
                            to="/auth"
                        >
                            SignIn/SignUp
                        </Link>
                    </h5>
                </div>
            </div>
        </div>
    );
};

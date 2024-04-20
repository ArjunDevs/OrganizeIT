import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup, signin } from "../../actions/auth";
import { useNavigate } from "react-router-dom";

const InitialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

// pt-16 padding
export const Auth = () => {
    const [FormData, setFormData] = useState(InitialFormData);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value });
    };

    const handleSignInchange = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isSignup) {
            dispatch(signup(FormData, navigate));
        } else {
            dispatch(signin(FormData, navigate));
        }
    };

    return (
        <div className="pt-16 bg-gray-800 min-h-screen flex flex-col justify-center items-center">
            <div className="bg-transparent w-auto h-auto px-10 py-10 flex flex-col border-2 border-gray-300 rounded">
                <h1 className="text-center mb-4 mx-4 font-mono text-gray-300 text-3xl font-extrabold">
                    {isSignup
                        ? "Sign Up for an Account"
                        : "Sign In to your Account"}
                </h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="flex flex-col ">
                            <label className="font-mono text-gray-300 text-xl py-1">
                                First Name
                            </label>
                            <input
                                className="bg-gray-700 rounded h-10 mb-2 border border-gray-500 hover:border-gray-300 text-gray-300 text-lg font-semibold px-2"
                                name="firstName"
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                    )}
                    {isSignup && (
                        <div className="flex flex-col ">
                            <label className="font-mono text-gray-300 text-xl py-1">
                                Last Name
                            </label>
                            <input
                                className="bg-gray-700 rounded h-10 mb-2 border border-gray-500 hover:border-gray-300 text-gray-300 text-lg font-semibold px-2"
                                name="lastName"
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                    )}
                    <div className="flex flex-col ">
                        <label className="font-mono text-gray-300 text-xl py-1">
                            Email address
                        </label>
                        <input
                            className="bg-gray-700 rounded h-10 mb-2 border border-gray-500 hover:border-gray-300 text-gray-300 text-lg font-semibold px-2"
                            name="email"
                            onChange={handleChange}
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label className="font-mono text-gray-300 text-xl py-1">
                            Password
                        </label>
                        <input
                            className="bg-gray-700 rounded h-10 mb-2 border border-gray-500 hover:border-gray-300 text-gray-300 text-lg font-semibold px-2"
                            name="password"
                            onChange={handleChange}
                            type="password"
                        />
                    </div>
                    {isSignup && (
                        <div className="flex flex-col ">
                            <label className="font-mono text-gray-300 text-xl py-1">
                                Confirm Password
                            </label>
                            <input
                                className="bg-gray-700 rounded h-10 mb-2 border border-gray-500 hover:border-gray-300 text-gray-300 text-lg font-semibold px-2"
                                name="confirmPassword"
                                onChange={handleChange}
                                type="password"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="px-3 py-2 mt-2 rounded bg-gray-300 text-black hover:bg-black hover:text-gray-300 transition-colors duration-300 font-bold"
                    >
                        {isSignup ? "Sign Up" : "Sign In"}
                    </button>
                </form>
            </div>
            <div>
                {isSignup ? (
                    <p className="text-gray-300">
                        Already have an account?{"  "}
                        <span
                            className=" hover:cursor-pointer hover:underline hover:text-white transition-colors duration-300"
                            onClick={handleSignInchange}
                        >
                            Sign in
                        </span>
                        .
                    </p>
                ) : (
                    <p className="text-gray-300">
                        Do not have an account?{"  "}
                        <span
                            className="hover:cursor-pointer hover:underline hover:text-white transition-colors duration-300"
                            onClick={handleSignInchange}
                        >
                            Sign Up
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

import React, { useState } from "react";
import "./Auth.css";
import { useDispatch } from "react-redux";
import { signup, signin } from "../../actions/auth";

const InitialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export const Auth = () => {
    const [FormData, setFormData] = useState(InitialFormData);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value });
    };

    const handleSignInchange = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(FormData);
        if (isSignup) {
            dispatch(signup(FormData));
        } else {
            dispatch(signin(FormData));
        }
    };

    return (
        <div>
            <div>
                {isSignup ? <h1>signup page</h1> : <h1>signin page</h1>}
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <label>
                            First Name:{" "}
                            <input
                                name="firstName"
                                onChange={handleChange}
                                type="text"
                            />
                        </label>
                    )}
                    {isSignup && (
                        <label>
                            Last Name:{" "}
                            <input
                                name="lastName"
                                onChange={handleChange}
                                type="text"
                            />
                        </label>
                    )}
                    <label>
                        Email:{" "}
                        <input
                            name="email"
                            onChange={handleChange}
                            type="text"
                        />
                    </label>
                    <label>
                        Password:{" "}
                        <input
                            name="password"
                            onChange={handleChange}
                            type="password"
                        />
                    </label>
                    {isSignup && (
                        <label>
                            Confirm Password:{" "}
                            <input
                                name="confirmPassword"
                                onChange={handleChange}
                                type="password"
                            />
                        </label>
                    )}

                    <button type="submit">signin</button>
                </form>
            </div>
            <div>
                {isSignup ? (
                    <p>
                        Already have an account?{" "}
                        <span onClick={handleSignInchange}>Sign in</span>.
                    </p>
                ) : (
                    <p>
                        Do not have an account?{" "}
                        <span onClick={handleSignInchange}>Sign Up</span>
                    </p>
                )}
            </div>
        </div>
    );
};

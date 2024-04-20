import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.PNG";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

export const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const user = localStorage.getItem("profile");

        if (user) {
            const parsedUser = JSON.parse(user);
            const decodedToken = jwtDecode(parsedUser.token);
            let currentTime = new Date();
            if (decodedToken?.exp * 1000 > currentTime.getTime()) {
                setIsLoggedIn(true);
            } else {
                // dispatch a logout action.
                dispatch({ type: "SIGNOUT" });
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, [dispatch, auth]);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLoginLogout = (e) => {
        e.preventDefault();
        if (isloggedIn) {
            dispatch({ type: "SIGNOUT" });
            navigate("/");
        } else {
            navigate("/auth");
        }
    };

    return (
        <nav className="bg-gray-200 border-gray-900 dark:bg-gray-900 fixed top-0 w-full z-100">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                <Link to="/" className="flex items-center">
                    <img src={logo} className="h-8" alt="logo" />
                    <span className="text-black no-underline self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">
                        OrganizeIT
                    </span>
                </Link>

                <button
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    onClick={toggleCollapse}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                <div
                    className={`${
                        isCollapsed ? "hidden" : ""
                    } w-full md:block md:w-auto bg-gray-200`}
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-900 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-200 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
                        <li>
                            <Link
                                to="/"
                                className="block py-2 px-3 text-gray-500 hover:underline rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                {" "}
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="block py-2 px-3 text-gray-500 hover:underline rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="block py-2 px-3 text-gray-500 hover:underline rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                about
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="block py-2 px-3 text-gray-500 hover:underline rounded md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0 dark:text-white md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                contact
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLoginLogout}
                                className="block py-2 px-3 bg-slate-400 text-white md:hover:bg-gray-900 hover:bg-gray-900 rounded md:border-0 md:bg-slate-400 hover:text-white focus:ring-2 focus:ring-gray-300 transition-colors duration-300"
                            >
                                {!isloggedIn ? "SignIn/SignUp" : "LogOut"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

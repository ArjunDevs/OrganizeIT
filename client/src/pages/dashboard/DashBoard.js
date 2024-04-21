import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getboards, createboard } from "../../actions/user";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BoardCard } from "../../components/boardCard/BoardCard";

// on dashboard we  need :
// 1. all the boards the user currently has.
// 2. option to create a new board.
// 3. edit a board (title)
// 4. delete a board
// userid is fetched from the backeend which is used to call the routes

const InitialBoardFormData = {
    title: "",
};

export const DashBoard = () => {
    const [userId, setUserId] = useState("");
    const [BoardFormData, setBoardFormData] = useState(InitialBoardFormData);
    const [isCreateNewBoard, setIsCreateNewBoard] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userboardsData = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const user = localStorage.getItem("profile");

        if (user) {
            const parsedUser = JSON.parse(user);
            const decodedToken = jwtDecode(parsedUser.token);
            let currentTime = new Date();
            if (decodedToken?.exp * 1000 > currentTime.getTime()) {
                const parsedUserId = parsedUser.result._id;
                setUserId(parsedUserId);
                dispatch(getboards(parsedUserId));
            } else {
                // dispatch a logout action.
                dispatch({ type: "SIGNOUT" });
                //navigate to home
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [dispatch, navigate, auth]);

    const handleFormDataChange = (e) => {
        setBoardFormData({ ...BoardFormData, [e.target.name]: e.target.value });
    };
    const handleCreateButtonClick = () => {
        setIsCreateNewBoard((prevValue) => !prevValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsCreateNewBoard((prevValue) => !prevValue);
        dispatch(createboard(userId, BoardFormData));
    };

    const handleCancel = () => {
        setIsCreateNewBoard((prevValue) => !prevValue);
    };

    return (
        <div className="pt-16 bg-gray-800 min-h-screen flex flex-col">
            <div className="flex flex-row justify-between items-center px-20 py-5 border-b-2 border-b-white">
                <h1 className="text-3xl font-bold font-mono text-white">
                    Welcome To The DashBoard
                </h1>

                {!isCreateNewBoard && (
                    <button
                        className="px-3 py-2 rounded bg-gray-300 text-black hover:bg-black hover:text-gray-300 transition-colors duration-300 font-bold"
                        onClick={handleCreateButtonClick}
                    >
                        Create Board
                    </button>
                )}
            </div>

            <div className="mx-20 my-5 grid grid-cols-3 gap-4 overflow-y-auto xl:grid-cols-4">
                {userboardsData.Userboards.map((board) => (
                    <BoardCard
                        key={board._id}
                        id={board._id}
                        title={board.title}
                        userId={userId}
                    />
                ))}
            </div>

            {isCreateNewBoard && (
                <div className="absolute inset-0 bg-white/30 pt-16 backdrop-blur-sm flex flex-col justify-center items-center">
                    <div className="bg-transparent backdrop-blur-lg w-auto h-auto px-10 py-10 flex flex-col border-2 border-gray-300 rounded">
                        <h1 className="mb-4 font-mono text-gray-700 text-3xl font-extrabold">
                            Create a New Board
                        </h1>
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <label className="font-mono text-gray-700 text-xl py-1">
                                    Title:{" "}
                                    <input
                                        className="bg-gray-700 rounded h-10 mb-2 border border-gray-500 hover:border-gray-300 text-gray-300 text-lg font-semibold px-2 w-80"
                                        type="text"
                                        name="title"
                                        onChange={handleFormDataChange}
                                    />
                                </label>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <button
                                    className="px-3 py-2 rounded bg-gray-300 text-black hover:bg-black hover:text-gray-300 transition-colors duration-300 font-bold"
                                    type="submit"
                                >
                                    Create
                                </button>
                                <button
                                    className="px-3 py-2 rounded bg-gray-300 text-black hover:bg-black hover:text-gray-300 transition-colors duration-300 font-bold"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

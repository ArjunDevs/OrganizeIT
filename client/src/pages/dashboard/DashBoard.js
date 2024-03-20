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
    }, [dispatch, navigate]);

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

    return (
        <div>
            <h1>this is the dashboard</h1>
            {userboardsData.Userboards.map((board) => (
                <BoardCard
                    key={board._id}
                    id={board._id}
                    title={board.title}
                    userId={userId}
                />
            ))}
            {!isCreateNewBoard && (
                <button onClick={handleCreateButtonClick}>
                    CLick to Create a new Board
                </button>
            )}
            {isCreateNewBoard && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Title:{" "}
                            <input
                                type="text"
                                name="title"
                                onChange={handleFormDataChange}
                            />
                        </label>
                        <button type="submit">Create</button>
                    </form>
                </div>
            )}
        </div>
    );
};

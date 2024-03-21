import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gettasklists, createtasklist } from "../../actions/board";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { TaskList } from "../../components/TaskList/TaskList";

const InitialTaskListData = {
    title: "",
};

export const Board = () => {
    const linkParams = useParams();
    const [isCreateNewTasklist, setIsCreateNewTasklist] = useState(false);
    const [TasklistFormData, setTasklistFormData] =
        useState(InitialTaskListData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const taskListsdata = useSelector(
        (state) => state.board[linkParams.boardId] || []
    );

    useEffect(() => {
        const user = localStorage.getItem("profile");

        if (user) {
            const parsedUser = JSON.parse(user);
            const decodedToken = jwtDecode(parsedUser.token);
            let currentTime = new Date();
            if (decodedToken?.exp * 1000 > currentTime.getTime()) {
                dispatch(gettasklists(linkParams.boardId));
            } else {
                // dispatch a logout action.
                dispatch({ type: "SIGNOUT" });
                //navigate to home
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [dispatch, navigate, linkParams.boardId]);

    const handleFormDataChange = (e) => {
        setTasklistFormData({
            ...TasklistFormData,
            [e.target.name]: e.target.value,
        });
    };
    const handleCreateTaskList = () => {
        setIsCreateNewTasklist((prevValue) => !prevValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsCreateNewTasklist((prevValue) => !prevValue);
        dispatch(createtasklist(linkParams.boardId, TasklistFormData));
    };

    return (
        <div>
            <div>
                {taskListsdata.map((tasklist) => (
                    <TaskList
                        key={tasklist._id}
                        id={tasklist._id}
                        title={tasklist.title}
                    />
                ))}
            </div>
            {!isCreateNewTasklist && (
                <button onClick={handleCreateTaskList}>
                    {" "}
                    click to create new task list
                </button>
            )}
            {isCreateNewTasklist && (
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

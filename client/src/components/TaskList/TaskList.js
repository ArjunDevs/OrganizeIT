import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edittasklist, deletetasklist } from "../../actions/board";
import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../Task/Task";
import { gettasks, createtask } from "../../actions/tasklist";
import { jwtDecode } from "jwt-decode";

const initialTaskFormData = {
    title: "",
    description: "",
};

export const TaskList = (props) => {
    const LinkParams = useParams();
    const dispatch = useDispatch();
    const [isEditTaskListInfo, setisEditTaskListInfo] = useState(false);
    const [TasklistFormData, setTasklistFormData] = useState({
        title: props.title,
    });
    const [isCreateNewTask, setIsCreateNewTask] = useState(false);
    const [TaskFormData, setTaskFormData] = useState(initialTaskFormData);

    const navigate = useNavigate();
    const TaskData = useSelector((state) => state.tasklist[props.id] || []);

    useEffect(() => {
        const user = localStorage.getItem("profile");

        if (user) {
            const parsedUser = JSON.parse(user);
            const decodedToken = jwtDecode(parsedUser.token);
            let currentTime = new Date();
            if (decodedToken?.exp * 1000 > currentTime.getTime()) {
                dispatch(gettasks(props.id));
            } else {
                // dispatch a logout action.
                dispatch({ type: "SIGNOUT" });
                //navigate to home
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [dispatch, navigate, props.id]);

    const handleCreateTask = () => {
        setIsCreateNewTask((prevValue) => !prevValue);
    };

    const handlecreateTaskSubmit = (e) => {
        e.preventDefault();
        setIsCreateNewTask((prevValue) => !prevValue);
        dispatch(createtask(props.id, TaskFormData));
    };

    const handleCreateTaskFormDataChange = (e) => {
        setTaskFormData({
            ...TaskFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleTaskListDelete = (e) => {
        e.preventDefault();
        dispatch(deletetasklist(LinkParams.boardId, props.id));
    };
    const handleEditTaskListInfo = () => {
        setisEditTaskListInfo((prevValue) => !prevValue);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setisEditTaskListInfo((prevValue) => !prevValue);
        dispatch(edittasklist(LinkParams.boardId, props.id, TasklistFormData));
    };

    const handleFormDataChange = (e) => {
        setTasklistFormData({
            ...TasklistFormData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <div>
                <h1>This is the tasklist : {props.title}</h1>
                {TaskData.map((task) => (
                    <Task
                        key={task._id}
                        id={task._id}
                        data={task}
                        tasklistId={props.id}
                    />
                ))}
            </div>
            <div>
                {!isCreateNewTask && (
                    <button onClick={handleCreateTask}>
                        {" "}
                        click to create new task
                    </button>
                )}
                {isCreateNewTask && (
                    <div>
                        <form onSubmit={handlecreateTaskSubmit}>
                            <label>
                                Title:{" "}
                                <input
                                    type="text"
                                    name="title"
                                    onChange={handleCreateTaskFormDataChange}
                                />
                                Desccription:{" "}
                                <input
                                    type="text"
                                    name="description"
                                    onChange={handleCreateTaskFormDataChange}
                                />
                            </label>
                            <button type="submit">Create</button>
                        </form>
                    </div>
                )}
            </div>
            <div>
                {!isEditTaskListInfo && (
                    <button onClick={handleEditTaskListInfo}>
                        Edit TaskList Info
                    </button>
                )}
                {isEditTaskListInfo && (
                    <div>
                        <form onSubmit={handleEditSubmit}>
                            <label>
                                Title:{" "}
                                <input
                                    type="text"
                                    name="title"
                                    onChange={handleFormDataChange}
                                    value={TasklistFormData.title}
                                />
                            </label>
                            <button type="submit">Create</button>
                        </form>
                    </div>
                )}
                <button onClick={handleTaskListDelete}>Delete Tasklist</button>
            </div>
        </div>
    );
};

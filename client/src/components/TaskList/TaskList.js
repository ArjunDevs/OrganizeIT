import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edittasklist, deletetasklist } from "../../actions/board";
import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../Task/Task";
import { gettasks, createtask } from "../../actions/tasklist";
import { jwtDecode } from "jwt-decode";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { Droppable } from "react-beautiful-dnd";

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

    const handleCancelEditTaskList = () => {
        setisEditTaskListInfo((prevValue) => !prevValue);
    };

    const handleCancelCreateTask = () => {
        setIsCreateNewTask((prevValue) => !prevValue);
    };

    return (
        <div className="h-fit min-w-96 border border-white mr-10 rounded-lg flex flex-col p-5 bg-slate-200/80">
            <div className="flex flex-row justify-between items-center border-b-2 border-slate-500 pb-1 mb-1">
                <h1 className="text-xl font-extrabold font-mono text-slate-800 truncate">
                    {props.title}
                </h1>
                <div className="flex flex-row">
                    {!isEditTaskListInfo && (
                        <button
                            className="rounded-md hover:bg-slate-300 transition-colors duration-300"
                            onClick={handleEditTaskListInfo}
                        >
                            <FiEdit className=" text-blue-800 w-8 h-8 p-1" />
                        </button>
                    )}

                    <button
                        className="rounded-md hover:bg-slate-300 transition-colors duration-300"
                        onClick={handleTaskListDelete}
                    >
                        <AiFillDelete className=" text-red-500 w-8 h-8 p-1" />
                    </button>
                </div>
            </div>

            <Droppable
                droppableId={`tasklist-${props.id}`}
                key={`tasklist-${props.id}`}
            >
                {(provided) => (
                    <div
                        className="flex flex-col"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {TaskData.length === 0 && (
                            <div className=" opacity-20 bg-inherit w-auto min-h-20 flex flex-row justify-center items-center rounded-lg mb-2 p-2 border-dashed border-4 border-black">
                                <IoAddCircleOutline className="text-black w-7 h-7 p-1" />
                                <span>Add or drag items</span>
                            </div>
                        )}
                        {TaskData.map((task, index) => (
                            <Task
                                key={task._id}
                                id={task._id}
                                data={task}
                                tasklistId={props.id}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className="flex flex-col justify-center items-center">
                {!isCreateNewTask && (
                    <button
                        className="w-full rounded-lg bg-slate-200 hover:bg-slate-300 hover:font-bold transition duration-300"
                        onClick={handleCreateTask}
                    >
                        <div className="flex flex-row justify-center items-center">
                            <AiOutlinePlus className=" text-blue-500 w-8 h-8 p-1" />
                            <span className="">Create Task</span>
                        </div>
                    </button>
                )}
            </div>

            {isEditTaskListInfo && (
                <div className="absolute inset-0 bg-white/30 pt-16 backdrop-blur-sm flex flex-col justify-center items-center">
                    <div className="bg-transparent backdrop-blur-lg w-auto h-auto px-10 py-10 flex flex-col border-2 border-gray-300 rounded">
                        <h1 className="mb-4 font-mono text-gray-700 text-3xl font-extrabold">
                            Edit Task List
                        </h1>
                        <form
                            className="flex flex-col"
                            onSubmit={handleEditSubmit}
                        >
                            <div className="flex flex-col">
                                <label className="font-mono text-gray-700 text-xl py-1">
                                    Title:{" "}
                                    <input
                                        className="bg-gray-700 rounded h-10 mb-2 border border-gray-500 hover:border-gray-300 text-gray-300 text-lg font-semibold px-2 w-80"
                                        type="text"
                                        name="title"
                                        onChange={handleFormDataChange}
                                        value={TasklistFormData.title}
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
                                    onClick={handleCancelEditTaskList}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isCreateNewTask && (
                <div className="absolute inset-0 bg-white/30 pt-16 backdrop-blur-sm flex flex-col justify-center items-center">
                    <div className="bg-transparent backdrop-blur-lg w-auto h-auto px-10 py-10 flex flex-col border-2 border-gray-300 rounded">
                        <h1 className="mb-4 font-mono text-gray-700 text-3xl font-extrabold">
                            Create Task
                        </h1>
                        <form
                            className="flex flex-col"
                            onSubmit={handlecreateTaskSubmit}
                        >
                            <div className="flex flex-col">
                                <label className="font-mono text-gray-700 text-xl py-1">
                                    Title:{" "}
                                    <input
                                        className="bg-gray-700 rounded h-10 mb-2 border border-gray-500 hover:border-gray-300 text-gray-300 text-lg font-semibold px-2 w-80"
                                        type="text"
                                        name="title"
                                        onChange={
                                            handleCreateTaskFormDataChange
                                        }
                                    />
                                </label>
                                <label className="font-mono text-gray-700 text-xl py-1">
                                    Description:{" "}
                                    <input
                                        className="bg-gray-700 rounded h-10 mb-2 border border-gray-500 hover:border-gray-300 text-gray-300 text-lg font-semibold px-2 w-80"
                                        type="text"
                                        name="description"
                                        onChange={
                                            handleCreateTaskFormDataChange
                                        }
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
                                    onClick={handleCancelCreateTask}
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

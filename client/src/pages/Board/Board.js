import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    gettasklists,
    createtasklist,
    performTaskDragReorder,
} from "../../actions/board";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { TaskList } from "../../components/TaskList/TaskList";
import { DragDropContext } from "react-beautiful-dnd";

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
    const auth = useSelector((state) => state.auth);

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
                alert("Authentication Expired! please re-Login!");
                dispatch({ type: "SIGNOUT" });
                //navigate to home
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [dispatch, navigate, linkParams.boardId, auth]);

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

    const handleCancel = () => {
        setIsCreateNewTasklist((prevValue) => !prevValue);
    };

    const handleOnDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            if (source.index === destination.index) {
                return;
            }
        }
        const draggedItem = draggableId.split("-")[0];
        if (draggedItem === "task") {
            const destinationTaskListId = destination.droppableId.split("-")[1];
            const destinationIndex = destination.index;
            const sourceTaskListId = source.droppableId.split("-")[1];
            const sourceIndex = source.index;
            const draggedTaskId = draggableId.split("-")[1];
            dispatch(
                performTaskDragReorder(
                    destinationTaskListId,
                    destinationIndex,
                    sourceTaskListId,
                    sourceIndex,
                    draggedTaskId
                )
            );
        } else if (draggedItem === "tasklist") {
        } else {
            console.log("invalid drag");
        }
    };
    return (
        <div className="pt-16 bg-gray-800 min-h-screen flex flex-row">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="flex flex-row justify-between px-20 py-5 overflow-auto">
                    {taskListsdata.map((tasklist, index) => (
                        <TaskList
                            key={tasklist._id}
                            id={tasklist._id}
                            title={tasklist.title}
                            index={index}
                        />
                    ))}
                    {!isCreateNewTasklist && (
                        <div className="min-w-96">
                            <button
                                className="w-full px-3 py-2 rounded bg-gray-300 text-black hover:bg-black hover:text-gray-300 transition-colors duration-300 font-bold hover:border-white border"
                                onClick={handleCreateTaskList}
                            >
                                {" "}
                                Create Tasklist
                            </button>
                        </div>
                    )}
                </div>
            </DragDropContext>

            {isCreateNewTasklist && (
                <div className="absolute inset-0 bg-white/30 pt-16 backdrop-blur-sm flex flex-col justify-center items-center">
                    <div className="bg-transparent backdrop-blur-lg w-auto h-auto px-10 py-10 flex flex-col border-2 border-gray-300 rounded">
                        <h1 className="mb-4 font-mono text-gray-700 text-3xl font-extrabold">
                            Create New TaskList
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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { edittask, deletetask } from "../../actions/tasklist";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";

export const Task = (props) => {
    const [isEditTaskInfo, setIsEditTaskInfo] = useState(false);
    const [TaskFormData, setTaskFormData] = useState({
        title: props.data.title,
        description: props.data.description,
    });
    const dispatch = useDispatch();

    const handleTaskEditSubmit = (e) => {
        e.preventDefault();
        setIsEditTaskInfo((prevValue) => !prevValue);
        dispatch(edittask(props.tasklistId, props.id, TaskFormData));
    };

    const handleEditTaskInfo = () => {
        setIsEditTaskInfo((prevValue) => !prevValue);
    };

    const handleTaskFormDataChange = (e) => {
        setTaskFormData({
            ...TaskFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleTaskDelete = (e) => {
        e.preventDefault();
        dispatch(deletetask(props.tasklistId, props.id));
    };

    const handleCancelCreateTask = () => {
        setIsEditTaskInfo((prevValue) => !prevValue);
    };

    return (
        <Draggable
            key={`task-${props.id}`}
            draggableId={`task-${props.id}`}
            index={props.index}
        >
            {(provided) => (
                <div
                    className="w-auto min-h-32 flex flex-col justify-between bg-slate-200 hover:bg-slate-300 transition-colors duration-300 rounded-lg mb-2 p-2"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div>
                        <h2 className="text-xl font-bold font-mono text-black">
                            {props.data.title}
                        </h2>
                        <h4 className="font-light text-slate-800">
                            {props.data.description}
                        </h4>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        {!isEditTaskInfo && (
                            <button
                                className="rounded-md hover:bg-slate-400 transition-colors duration-300"
                                onClick={handleEditTaskInfo}
                            >
                                <FiEdit className=" text-blue-800 w-8 h-8 p-1" />
                            </button>
                        )}
                        <button
                            className="rounded-md hover:bg-slate-400 transition-colors duration-300"
                            onClick={handleTaskDelete}
                        >
                            <AiFillDelete className=" text-red-500 w-8 h-8 p-1" />
                        </button>
                    </div>
                    {isEditTaskInfo && (
                        <div className="absolute inset-0 bg-white/30 pt-16 backdrop-blur-sm flex flex-col justify-center items-center">
                            <div className="bg-transparent backdrop-blur-lg w-auto h-auto px-10 py-10 flex flex-col border-2 border-gray-300 rounded">
                                <h1 className="mb-4 font-mono text-gray-700 text-3xl font-extrabold">
                                    Create Task
                                </h1>
                                <form
                                    className="flex flex-col"
                                    onSubmit={handleTaskEditSubmit}
                                >
                                    <div className="flex flex-col">
                                        <label className="font-mono text-gray-700 text-xl py-1">
                                            Title:{" "}
                                            <input
                                                className="bg-gray-700 rounded h-10 mb-2 border border-gray-500 hover:border-gray-300 text-gray-300 text-lg font-semibold px-2 w-80"
                                                type="text"
                                                name="title"
                                                onChange={
                                                    handleTaskFormDataChange
                                                }
                                                value={TaskFormData.title}
                                            />
                                        </label>
                                        <label className="font-mono text-gray-700 text-xl py-1">
                                            Description:{" "}
                                            <input
                                                className="bg-gray-700 rounded h-10 mb-2 border border-gray-500 hover:border-gray-300 text-gray-300 text-lg font-semibold px-2 w-80"
                                                type="text"
                                                name="description"
                                                onChange={
                                                    handleTaskFormDataChange
                                                }
                                                value={TaskFormData.description}
                                            />
                                        </label>
                                    </div>
                                    <div className="flex flex-row justify-between items-center">
                                        <button
                                            className="px-3 py-2 rounded bg-gray-300 text-black hover:bg-black hover:text-gray-300 transition-colors duration-300 font-bold"
                                            type="submit"
                                        >
                                            Save
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
            )}
        </Draggable>
    );
};

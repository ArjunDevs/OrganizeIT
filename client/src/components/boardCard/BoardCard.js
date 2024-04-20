import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteboard, editboard } from "../../actions/user";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

export const BoardCard = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isEditBoardInfo, setIsEditBoardInfo] = useState(false);
    const [BoardFormData, setBoardFormData] = useState({
        title: props.title,
    });

    const handleBoardDelete = (e) => {
        e.preventDefault();
        dispatch(deleteboard(props.userId, props.id));
    };
    const handleEditBoardInfo = () => {
        setIsEditBoardInfo((prevValue) => !prevValue);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setIsEditBoardInfo((prevValue) => !prevValue);
        dispatch(editboard(props.userId, props.id, BoardFormData));
    };

    const handleFormDataChange = (e) => {
        setBoardFormData({ ...BoardFormData, [e.target.name]: e.target.value });
    };

    const handleBoardCardClick = (e) => {
        e.preventDefault();
        navigate(`/${props.userId}/Board/${props.id}`);
    };

    const handleCancel = () => {
        setIsEditBoardInfo((prevValue) => !prevValue);
    };
    return (
        <div className=" w-auto min-h-40 max-h-40 bg-slate-200/90 rounded-lg overflow-hidden hover:bg-slate-400/90 transition-colors duration-300">
            <div className="p-3 h-full flex flex-col justify-between">
                <h1
                    className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer hover:underline truncate border-b-2 border-slate-700"
                    onClick={handleBoardCardClick}
                >
                    {props.title}
                </h1>

                <div className="flex flex-row justify-between">
                    {!isEditBoardInfo && (
                        <button
                            className="rounded-md hover:bg-slate-300 transition-colors duration-300"
                            onClick={handleEditBoardInfo}
                        >
                            <FiEdit className=" text-blue-800 w-8 h-8 p-1" />
                        </button>
                    )}
                    <button
                        className="rounded-md hover:bg-slate-300 transition-colors duration-300"
                        onClick={handleBoardDelete}
                    >
                        <svg
                            className=" text-red-600 dark:text-gray-500 w-8 h-8 p-1"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isEditBoardInfo && (
                <div className="absolute inset-0 bg-white/30 pt-16 backdrop-blur-sm flex flex-col justify-center items-center">
                    <div className="bg-transparent backdrop-blur-lg w-auto h-auto px-10 py-10 flex flex-col border-2 border-gray-300 rounded">
                        <h1 className="mb-4 font-mono text-gray-700 text-3xl font-extrabold">
                            Edit Board
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
                                        value={BoardFormData.title}
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

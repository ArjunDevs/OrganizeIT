import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { edittask, deletetask } from "../../actions/tasklist";

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

    return (
        <div>
            <div>
                <h1>TASK</h1>
                <h2>Title : {props.data.title}</h2>
                <h4>desc: {props.data.description}</h4>
            </div>
            <div>
                {!isEditTaskInfo && (
                    <button onClick={handleEditTaskInfo}>Edit Task</button>
                )}
                {isEditTaskInfo && (
                    <div>
                        <form onSubmit={handleTaskEditSubmit}>
                            <label>
                                Title:{" "}
                                <input
                                    type="text"
                                    name="title"
                                    onChange={handleTaskFormDataChange}
                                    value={TaskFormData.title}
                                />
                                Desccription:{" "}
                                <input
                                    type="text"
                                    name="description"
                                    onChange={handleTaskFormDataChange}
                                    value={TaskFormData.description}
                                />
                            </label>
                            <button type="submit">Create</button>
                        </form>
                    </div>
                )}
                <button onClick={handleTaskDelete}>Delete Task</button>
            </div>
        </div>
    );
};

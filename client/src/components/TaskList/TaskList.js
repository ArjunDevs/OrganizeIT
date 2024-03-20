import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { edittasklist, deletetasklist } from "../../actions/board";
import { useParams } from "react-router-dom";

export const TaskList = (props) => {
    const LinkParams = useParams();
    const dispatch = useDispatch();
    const [isEditTaskListInfo, setisEditTaskListInfo] = useState(false);
    const [TasklistFormData, setTasklistFormData] = useState({
        title: props.title,
    });

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
                {/* this div will contain all the tasks in the future. */}
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

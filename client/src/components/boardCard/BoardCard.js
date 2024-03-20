import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteboard, editboard } from "../../actions/user";
import { useNavigate } from "react-router-dom";

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
    return (
        <div>
            <h1 onClick={handleBoardCardClick} style={{ cursor: "pointer" }}>
                {props.title}
            </h1>
            {!isEditBoardInfo && (
                <button onClick={handleEditBoardInfo}>Edit Board Info</button>
            )}
            {isEditBoardInfo && (
                <div>
                    <form onSubmit={handleEditSubmit}>
                        <label>
                            Title:{" "}
                            <input
                                type="text"
                                name="title"
                                onChange={handleFormDataChange}
                                value={BoardFormData.title}
                            />
                        </label>
                        <button type="submit">Create</button>
                    </form>
                </div>
            )}
            <button onClick={handleBoardDelete}>Delete Board</button>
        </div>
    );
};

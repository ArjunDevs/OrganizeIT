import { combineReducers } from "redux";
import { Authreducer } from "./auth";
import { BoardReducer } from "./board";
import { TaskListReducer } from "./tasklist";
import { UserReducer } from "./user";

export default combineReducers({
    auth: Authreducer,
    user: UserReducer,
    board: BoardReducer,
    tasklist: TaskListReducer,
});

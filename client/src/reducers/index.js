import { combineReducers } from "redux";
import { Authreducer } from "./auth";
import { UserReducer } from "./user";
import { BoardReducer } from "./board";
export default combineReducers({
    auth: Authreducer,
    user: UserReducer,
    board: BoardReducer,
});

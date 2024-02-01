import { combineReducers } from "redux";
import { Authreducer } from "./auth";
import { UserReducer } from "./user";
export default combineReducers({
    auth: Authreducer,
    user: UserReducer,
});

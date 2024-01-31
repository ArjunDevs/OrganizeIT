import { combineReducers } from "redux";
import { Authreducer } from "./auth";
export default combineReducers({
    auth: Authreducer,
});

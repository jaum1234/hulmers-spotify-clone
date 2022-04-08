import { combineReducers } from "redux";
import auth from "./auth";
import songPlayer from "./songPlayer";

export default combineReducers({
    auth,
    songPlayer
})
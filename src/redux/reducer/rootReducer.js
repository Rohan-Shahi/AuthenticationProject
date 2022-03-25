import { ScreenReducer } from "./ScreenReducer";
import { combineReducers } from "redux";
import { UserReducer } from "./UserReducer";

export const rootReducer = combineReducers({
    screen : ScreenReducer,
    users : UserReducer
})

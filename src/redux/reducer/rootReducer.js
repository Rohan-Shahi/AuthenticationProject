import {
  createScreenReducer,
  deleteScreenReducer,
  ScreenReducer,
  updateScreenReducer,
} from "./ScreenReducer";
import { combineReducers } from "redux";
import { UserReducer } from "./UserReducer";

export const rootReducer = combineReducers({
  screen: ScreenReducer,
  deleteScreen: deleteScreenReducer,
  createScreen: createScreenReducer,
  updateScreen: updateScreenReducer,

  users: UserReducer,
});

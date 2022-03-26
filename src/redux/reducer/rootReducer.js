import {
  createScreenReducer,
  deleteScreenReducer,
  ScreenReducer,
  updateScreenReducer,
} from "./ScreenReducer";
import { combineReducers } from "redux";
import {
  createUserReducer,
  deleteUserReducer,
  updateUserReducer,
  UserReducer,
} from "./UserReducer";
import {
  createRoleReducer,
  deleteRoleReducer,
  roleReducer,
  updateRoleReducer,
} from "./RoleReducer";

export const rootReducer = combineReducers({
  screen: ScreenReducer,
  deleteScreen: deleteScreenReducer,
  createScreen: createScreenReducer,
  updateScreen: updateScreenReducer,

  users: UserReducer,
  createUser: createUserReducer,
  deleteUser: deleteUserReducer,
  updateUser: updateUserReducer,

  roles: roleReducer,
  createRole: createRoleReducer,
  deleteRole: deleteRoleReducer,
  updateRole: updateRoleReducer,
});

import { SCREEN_MAP_INIT, SCREEN_MAP_SUCCESS, USER_MAP_INIT, USER_MAP_SUCCESS } from "../constant";

export const screenMapReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case SCREEN_MAP_INIT:
      return {
        ...state,
        success: false,
      };

    case SCREEN_MAP_SUCCESS:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};


export const userMapReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case USER_MAP_INIT:
      return {
        ...state,
        success: false,
      };

    case USER_MAP_SUCCESS:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};
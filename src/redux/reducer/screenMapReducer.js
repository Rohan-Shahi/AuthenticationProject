import { SCREEN_MAP_INIT, SCREEN_MAP_SUCCESS } from "../constant";

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

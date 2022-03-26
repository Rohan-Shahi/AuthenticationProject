import {
  CREATE_SCREEN,
  CREATE_SCREEN_INIT,
  DELETE_SCREEN,
  DELETE_SCREEN_INIT,
  FETCH_SCREENS,
  UPDATE_SCREEN,
  UPDATE_SCREEN_INIT,
} from "../constant";

const initalState = {
  screenList: [],
};

export const ScreenReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_SCREENS:
      return {
        ...state,
        screenList: action.payload,
      };

    default:
      return state;
  }
};

export const deleteScreenReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case DELETE_SCREEN_INIT:
      return {
        ...state,
        success: false,
      };

    case DELETE_SCREEN:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

export const createScreenReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case CREATE_SCREEN_INIT:
      return {
        ...state,
        success: false,
      };

    case CREATE_SCREEN:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

export const updateScreenReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case UPDATE_SCREEN_INIT:
      return {
        ...state,
        success: false,
      };

    case UPDATE_SCREEN:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

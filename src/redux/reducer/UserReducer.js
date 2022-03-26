import {
  CREATE_USER,
  CREATE_USER_INIT,
  DELETE_USER,
  DELETE_USER_INIT,
  FETCH_USERS,
  UPDATE_USER,
  UPDATE_USER_INIT,
} from "../constant";

const initialState = {
  usersList: [],
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        usersList: action.payload,
      };

    default:
      return state;
  }
};

export const createUserReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case CREATE_USER_INIT:
      return {
        ...state,
        success: false,
      };

    case CREATE_USER:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

export const deleteUserReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case DELETE_USER_INIT:
      return {
        ...state,
        success: false,
      };

    case DELETE_USER:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

export const updateUserReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case UPDATE_USER_INIT:
      return {
        ...state,
        success: false,
      };

    case UPDATE_USER:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};



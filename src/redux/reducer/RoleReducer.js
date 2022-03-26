import {
  CREATE_ROLE,
  CREATE_ROLE_INIT,
  DELETE_ROLE,
  DELETE_ROLE_INIT,
  FETCH_ROLES,
  UPDATE_ROLE,
  UPDATE_ROLE_INIT,
} from "../constant";

const initialState = {
  rolesList: [],
};

export const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROLES:
      return {
        ...state,
        rolesList: action.payload,
      };

    default:
      return state;
  }
};

export const createRoleReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case CREATE_ROLE_INIT:
      return {
        ...state,
        success: false,
      };

    case CREATE_ROLE:
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
};

export const deleteRoleReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case DELETE_ROLE_INIT:
      return {
        ...state,
        success: false,
      };

    case DELETE_ROLE:
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
};

export const updateRoleReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case UPDATE_ROLE_INIT:
      return {
        ...state,
        success: false,
      };

    case UPDATE_ROLE:
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
};

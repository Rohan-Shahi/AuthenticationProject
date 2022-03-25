import { FETCH_USERS } from "../constant";

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

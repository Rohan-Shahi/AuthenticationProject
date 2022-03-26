import axios from "axios";
import {
  CREATE_SCREEN,
  CREATE_SCREEN_INIT,
  DELETE_SCREEN,
  DELETE_SCREEN_INIT,
  FETCH_SCREENS,
  UPDATE_SCREEN,
  UPDATE_SCREEN_INIT,
} from "../constant";

export const getScreen = (token) => async (dispatch) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://ecom-react-task.herokuapp.com/screens",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.data?.success) {
      dispatch({
        type: FETCH_SCREENS,
        payload: response?.data?.data,
      });
    }
  } catch (err) {
    alert(err);
  }
};

export const deleteScreen = (id, token) => async (dispatch) => {
  dispatch({
    type: DELETE_SCREEN_INIT,
  });
  try {
    const response = await axios({
      method: "DELETE",
      url: `https://ecom-react-task.herokuapp.com/screens/${id}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.success) {
      dispatch({
        type: DELETE_SCREEN,
      });
    }
  } catch (err) {
    alert(err);
  }
};

export const createScreen = (userInfo, token) => async (dispatch) => {
  dispatch({
    type: CREATE_SCREEN_INIT,
  });
  try {
    const response = await axios({
      method: "POST",
      url: `https://ecom-react-task.herokuapp.com/screens`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: userInfo,
    });
    if (response?.data?.success) {
      dispatch({
        type: CREATE_SCREEN,
      });
    }
  } catch (err) {
    alert(err);
  }
};

export const updateScreen = (id, userInfo, token) => async (dispatch) => {
  dispatch({
    type: UPDATE_SCREEN_INIT,
  });
  try {
    const response = await axios({
      method: "PUT",
      url: `https://ecom-react-task.herokuapp.com/screens/${id}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: userInfo,
    });
    if (response?.data?.success) {
      dispatch({ type: UPDATE_SCREEN });
    }
  } catch (err) {
    alert(err);
  }
};

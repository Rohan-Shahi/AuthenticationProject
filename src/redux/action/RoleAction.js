import axios from "axios";
import {
  CREATE_ROLE,
  CREATE_ROLE_INIT,
  DELETE_ROLE,
  DELETE_ROLE_INIT,
  FETCH_ROLES,
  UPDATE_ROLE,
  UPDATE_ROLE_INIT,
} from "../constant";

export const fetchRoles = (token) => async (dispatch) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://ecom-react-task.herokuapp.com/roles",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response?.data?.data)
    if (response?.data?.success) {
      dispatch({
        type: FETCH_ROLES,
        payload: response?.data?.data,
      });
    }
  } catch (err) {
    alert(err);
  }
};

export const createRole = (roleInfo, token) => async (dispatch) => {
  dispatch({
    type: CREATE_ROLE_INIT,
  });
  try {
    const response = await axios({
      method: "POST",
      url: `https://ecom-react-task.herokuapp.com/roles`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: roleInfo,
    });

    if (response?.data?.success) {
      dispatch({
        type: CREATE_ROLE,
      });
    }
  } catch (err) {
    alert(err);
  }
};

export const deleteRole = (id, token) => async (dispatch) => {
  dispatch({
    type: DELETE_ROLE_INIT,
  });
  try {
    const response = await axios({
      method: "DELETE",
      url: `https://ecom-react-task.herokuapp.com/roles/${id}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.success) {
      dispatch({
        type: DELETE_ROLE,
      });
    }
  } catch (err) {
    alert(err);
  }
};

export const updateRole = (id, roleInfo, token) => async (dispatch) => {
  dispatch({
    type: UPDATE_ROLE_INIT,
  });
  try {
    const response = await axios({
      method: "PUT",
      url: `https://ecom-react-task.herokuapp.com/roles/${id}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: roleInfo,
    });

    if (response?.data?.success) {
      dispatch({ type: UPDATE_ROLE });
    }
  } catch (err) {
    alert(err);
  }
};

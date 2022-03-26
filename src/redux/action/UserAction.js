import axios from "axios";
import { CREATE_USER, CREATE_USER_INIT, DELETE_USER, DELETE_USER_INIT, FETCH_USERS, UPDATE_USER, UPDATE_USER_INIT } from "../constant";

export const fetchUsers = (token) => async (dispatch) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://ecom-react-task.herokuapp.com/user",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.success) {
      dispatch({
        type: FETCH_USERS,
        payload: response?.data?.data,
      });
    }
  } catch (err) {
    alert(err);
  }
};

export const createUser = (userInfo, token) => async (dispatch) => {
  dispatch({
    type: CREATE_USER_INIT,
  });
  try {
    const response = await axios({
      method: "POST",
      url: "https://ecom-react-task.herokuapp.com/user",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: userInfo,
    });
    if (response?.data?.success) {
      dispatch({
        type: CREATE_USER,
      });
    }
  } catch (err) {
    alert(err);
  }
};

export const deleteUser = (id,token) => async (dispatch) => {
    dispatch({
        type: DELETE_USER_INIT
    })
    try{
        const response = await axios({
            method: 'DELETE',
            url : `https://ecom-react-task.herokuapp.com/user/${id}`,
            headers : {
                "Content-type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        })
        if(response?.data?.success){
            dispatch({
                type: DELETE_USER
            })
        }
    }catch(err) {
        alert(err);
    }
}

export const updateUser = (userInfo, id,token) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_INIT,
  });
  try {
    const response = await axios({
      method: "PUT",
      url: `https://ecom-react-task.herokuapp.com/user/${id}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: userInfo,

    });
    
    if (response?.data?.success) {
      dispatch({
        type: UPDATE_USER,
      });
    }
  } catch (err) {
    alert(err);
  }
};
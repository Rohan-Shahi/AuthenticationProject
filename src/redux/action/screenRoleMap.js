import axios from "axios";
import { SCREEN_MAP_INIT, SCREEN_MAP_SUCCESS, USER_MAP_INIT, USER_MAP_SUCCESS } from "../constant";

export const mapScreenRole = ( mapData,token) => async (dispatch) => {
    dispatch({
      type: SCREEN_MAP_INIT,
    });
    try {
      const response = await axios({
        method: "POST",
        url: `https://ecom-react-task.herokuapp.com/roles/screen/mapping`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: mapData
      });
      console.log(response)
      alert('Mapping Successful => response on console')
      if (response?.data?.success) {
        dispatch({
          type: SCREEN_MAP_SUCCESS,
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  export const mapUserRole = ( mapData,token) => async (dispatch) => {
    dispatch({
      type: USER_MAP_INIT,
    });
    try {
      const response = await axios({
        method: "POST",
        url: `https://ecom-react-task.herokuapp.com/user/role/map`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: mapData
      });
      console.log(response)
      alert(response?.data?.message)
      alert('Mapping Successful => response on console')
      if (response?.data?.success) {
        dispatch({
          type: USER_MAP_SUCCESS,
        });
      }
    } catch (err) {
      alert(err);
    }
  };


import axios from 'axios'
import { FETCH_ROLES } from '../constant';

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
}

// export const createRole = () 
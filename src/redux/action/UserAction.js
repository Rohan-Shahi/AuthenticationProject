import axios from "axios"
import { FETCH_USERS } from "../constant"


export const fetchUsers = (token) => async (dispatch) => {
    try{
        const response = await axios({
            method: 'GET',
            url : 'https://ecom-react-task.herokuapp.com/user',
            headers: {
                "Content-type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        })
       
        if(response?.data?.success){
            dispatch({
                type: FETCH_USERS,
                payload: response?.data?.data
            })
        }
    }catch(err){
        alert(err)
    }

}
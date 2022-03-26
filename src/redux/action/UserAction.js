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

export const createUser = (userInfo,token) => async (dispatch) => {
    try{
        const response = await axios({
            method: 'POST',
            url : 'https://ecom-react-task.herokuapp.com/user',
            headers: {
                "Content-type" : "application/json",
                Authorization : `Bearer ${token}`
            },
            data: userInfo
        })
    }catch(err){
        alert(err)
    }

}

// export const deleteScreen = (id,token) => async (dispatch) => {
//     try{
//         const response = await axios({
//             method: 'DELETE',
//             url : `https://ecom-react-task.herokuapp.com/screens/${id}`,
//             headers : {
//                 "Content-type" : "application/json",
//                 Authorization : `Bearer ${token}`
//             }
//         })
//     }catch(err) {
//         alert(err);
//     }
// }
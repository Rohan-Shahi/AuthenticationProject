import axios from "axios"
import { FETCH_SCREENS } from "../constant"

export const getScreen = (token) => async (dispatch) =>{
    
    try{
        const response = await axios({
            method : 'GET',
            url : 'https://ecom-react-task.herokuapp.com/screens',
            headers : {
                "Content-type": "application/json",
                 Authorization : `Bearer ${token}`
            }
        })
        if(response?.data?.success) {
            dispatch({
                type: FETCH_SCREENS,
                payload: response?.data?.data
            })
        }
    }catch(err){
        alert(err);
    }
    
}

export const deleteScreen = (id,token) => async (dispatch) => {
    try{
        const response = await axios({
            method: 'DELETE',
            url : `https://ecom-react-task.herokuapp.com/screens/${id}`,
            headers : {
                "Content-type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        })
    }catch(err) {
        alert(err);
    }
}

export const createScreen = (userInfo,token) => async (dispatch) =>{
    try{
        const response = await axios({
            method: 'POST',
            url : `https://ecom-react-task.herokuapp.com/screens`,
            headers : {
                "Content-type" : "application/json",
                Authorization : `Bearer ${token}`
            },
            data : userInfo
        })
        console.log(response)
    
    }catch(err) {
        alert(err);
    }
}

export const updateScreen = (id,userInfo,token) => async(dispatch) => {
    try{
        const response = await axios({
            method: 'PUT',
            url : `https://ecom-react-task.herokuapp.com/screens/${id}`,
            headers : {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${token}`
            },
            data : userInfo
    
        })
        console.log(response);

    }catch(err){
        alert(err)
    }
}

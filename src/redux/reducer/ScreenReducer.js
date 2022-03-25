import { FETCH_SCREENS } from "../constant";

const initalState = {
    screenList:[]
}

export const ScreenReducer = (state = initalState , action) =>{
    switch(action.type){
        case FETCH_SCREENS : 
        return{
            ...state,
            screenList : action.payload
        }
        default:
            return state
    }
}
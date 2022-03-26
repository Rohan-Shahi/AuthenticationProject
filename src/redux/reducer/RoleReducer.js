import { FETCH_ROLES } from "../constant"

const initialState = {
    rolesList : []
}

export const roleReducer = (state=initialState, action) => {

    switch(action.type) {
        case FETCH_ROLES:
            return{
                ...state,
                rolesList:action.payload
            }

        default: 
            return state
    }

}
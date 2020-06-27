import {LOGOUT_REQUESTING, LOGOUT_SUCCESS,LOGOUT_FAILED } from '../../../login/actionType'
const initialState = {
  requesting: false,
  isLogOut: false,
  errors: [],
}

function logoutReducer (state = initialState, action){
    switch(action.type){
      case LOGOUT_REQUESTING: 
      return state = {
        requesting: true,
        isLogOut: false,
        errors: []
      }
      case LOGOUT_SUCCESS : 
      return state = {
        requesting: false,
        isLogOut: true,
        errors: [],
      }
      case LOGOUT_FAILED : 
      return{
        requesting: false,
        isLogOut: false,
        errors: state.errors.concat({ body: action.error.toString(), time: new Date() }),
      }
      default :
        return state; 
     }
  
}

   export  default logoutReducer;
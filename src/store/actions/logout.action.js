import {LOGOUT_REQUESTING, LOGOUT_SUCCESS,LOGOUT_FAILED } from '../../store/actionTypes'
export const logOutRequest =(token)=>
{
    return {
      type: LOGOUT_REQUESTING,
      token
    }
}

export const logInSuccess = (response)=>
{
    return {
        type:LOGOUT_SUCCESS,
        response
    }
}

  
export const logOutFail = (error)=>{
    return {
        type: LOGOUT_FAILED,
        error
    }
}
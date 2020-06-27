import {LOGIN_REQUESTING, LOGIN_FAILED, LOGIN_SUCCESS, CHECK_IS_LOGIN} from '../actionTypes'

export const  logInRequest =  (email, password) =>{
  console.log('request ' + email, password);
    return {
      type: LOGIN_REQUESTING,
      email, password
    }
  }
  
  export const logInFail = (error)=>{
      return {
          type: LOGIN_FAILED,
          error
      }
  }
  export const checkIsLogin = (url)=>{
      return {
          type: CHECK_IS_LOGIN,
          url
      }
  }

  export const logInSuccess = (response)=>{
      return {
          type:LOGIN_SUCCESS,
          response
      }
  }


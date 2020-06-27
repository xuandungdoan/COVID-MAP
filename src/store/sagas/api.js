import { LOGIN_REQUESTING, LOGIN_FAILED, LOGIN_SUCCESS,LOGOUT_REQUESTING} from '../actionTypes';
import { takeLatest, put, call } from 'redux-saga/effects'

import forwardTo from '../history'

const urlPostLogin = 'http://localhost:5000/login';
const urlPostLogout = 'http://localhost:5000/logout';
// const urlPostVerify = 'http://localhost:5000/verify';

 async function  postLoginRequest (email, password)
{
  var respon ;
    await  fetch(urlPostLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => {respon =  response.json()})
  .then(json => json)
  .catch((error) => { throw error }) 
  
  return respon;
}

 function* loginFlow (action) {
    const { email, password } = action
    try {
      var response =  yield call(postLoginRequest, email, password)
        console.log('reposnes ' +JSON.stringify(response));
         if(response.status === 200){
          localStorage.setItem("token", response.token)
          yield forwardTo('/admin');  
          put({ type: LOGIN_SUCCESS, response });
       }
       else {
        put({ type: LOGIN_FAILED, response })
       }     
     
    } catch(error){
      yield put({ type: LOGIN_FAILED, error })
    }
  }

  export function* loginWatcher(){
    yield takeLatest(LOGIN_REQUESTING, loginFlow)
  }

 function* getLogOutRequest (action)
{
    yield  fetch(urlPostLogout, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Beare ' + action.token
    },
     
  })
  .then((response)=>{
      localStorage.removeItem("token");
      forwardTo('/login');
  })
  .catch((error) => { 
    put({ type: LOGIN_FAILED, error })
    throw error 
  }) 

}

  export function* logoutWatcher(){
    yield takeLatest(LOGOUT_REQUESTING, getLogOutRequest)
  }



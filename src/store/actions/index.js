import * as types from "./../actionTypes";

// actions for Map page

export const GetOldRoute = (route) => ({
  type: types.GET_OLD_ROUTE,
  route,
});

export const ClearEditPatient = () => ({
  type: types.CLEAR_EDIT_PATIENT,
});
export const CreatePatient = (patient) => ({
  type: types.CREATE_PATIENT,
  patient,
});
export const CreatePatientSuccess = () => ({
  type: types.CREATE_PATIENT_SUCCESS,
});
export const UpdatePatient = (id, patient) => ({
  type: types.UPDATE_PATIENT,
  id,
  patient,
});
export const UpdatePatientSuccess = () => ({
  type: types.UPDATE_PATIENT_SUCCESS,
});
export const EditPatient = (id) => ({
  type: types.EDIT_PATIENT,
  id,
});
export const EditPatientSuccess = (data) => ({
  type: types.EDIT_PATIENT_SUCCESS,
  data,
});
export const DeletePatient = (id) => ({
  type: types.DELETE_PATIENT,
  id,
});
export const DeletePatientSuccess = (data) => ({
  type: types.DELETE_PATIENT_SUCCESS,
  data,
});
export const requestAllPatients = () => ({ type: types.REQUEST_ALL_PATIENTS });
export const getAllPatients = (data) => {
  return {
    type: types.RECEIVE_ALL_PATIENTS,
    data,
  };
};
export const toggleFormMap = () => {
  return {
    type: types.TOGGLE_FORM_MAP,
  };
};
export const openFormMap = () => {
  return {
    type: types.SHOW_FORM_MAP,
  };
};
export const closeFormMap = () => {
  return {
    type: types.CLOSE_FORM_MAP,
  };
};

// ACTION FOR QUIZMAP
export const requestAllQuiz = () => ({ type: types.REQUEST_ALL_QUIZ });
export const getAllQuiz = (data) => {
  return {
    type: types.RECEIVE_ALL_QUIZ,
    data,
  };
};
export const CreateQuizSuccess = () => ({
  type: types.CREATE_QUIZ_SUCCESS,
});
export const deleteQuiz = (id) => ({
  type: types.DELETE_QUIZ,
  id,
});
export const deleteQuizSuccess = (data) => ({
  type: types.DELETE_QUIZ_SUCCESS,
  data,
});
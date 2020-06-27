import * as types from "../../actionTypes";

const initState = {};
const EditPatientReducer = (state = initState, action) => {
  switch (action.type) {
    case types.EDIT_PATIENT_SUCCESS:
      state = action.data;
      return state;
    case types.CREATE_PATIENT_SUCCESS:
      return (state = {});
    case types.UPDATE_PATIENT_SUCCESS:
      return (state = {});
    case types.CLEAR_EDIT_PATIENT:
      return (state = {});
    default:
      return state;
  }
};
export default EditPatientReducer;

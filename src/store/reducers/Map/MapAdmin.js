import * as types from "../../actionTypes";
const initState = [];

const MapReducer = (state = initState, action) => {
  switch (action.type) {
    case types.RECEIVE_ALL_PATIENTS:
      return (state = action.data);
    case types.DELETE_PATIENT_SUCCESS:
      return state;
    default:
      return state;
  }
};
export default MapReducer;

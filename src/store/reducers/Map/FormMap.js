import * as types from "../../actionTypes";

const initState = false;
const FormMapReducer = (state = initState, action) => {
  switch (action.type) {
    case types.TOGGLE_FORM_MAP:
      return !state;
    case types.SHOW_FORM_MAP:
      state = true;
      return state;
    case types.CLOSE_FORM_MAP:
      state = false;
      return state;
    default:
      return state;
  }
};
export default FormMapReducer;

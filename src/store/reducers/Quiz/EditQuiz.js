import * as types from "../../actionTypes";

const initState = {};
const EditQuizReducer = (state = initState, action) => {
  switch (action.type) {
    case types.EDIT_QUIZ_SUCCESS:
      state = action.data;
      return state;
    case types.CREATE_QUIZ_SUCCESS:
      return (state = {});
    case types.UPDATE_QUIZ_SUCCESS:
      return (state = {});
    case types.CLEAR_EDIT_QUIZ:
      return (state = {});
    default:
      return state;
  }
};
export default EditQuizReducer;

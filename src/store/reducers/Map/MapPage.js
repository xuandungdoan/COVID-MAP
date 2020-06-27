import * as types from "../../actionTypes";
const initState = [];

const MapReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_OLD_ROUTE:
      return (state = action.route);
    default:
      return state;
  }
};
export default MapReducer;

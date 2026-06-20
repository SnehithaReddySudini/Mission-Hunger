import { GET_FOOD_LIST } from "../actions/types";

const initialState = {
  foods: [],
  loading: false
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOOD_LIST:
      return {
        ...state,
        foods: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default foodReducer;
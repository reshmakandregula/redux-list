import { FETCH_USERS, ADD_USER, DELETE_USER } from "../actions/types";

const initialState = {
  items: [],
  item: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      console.log("reducer");
      return {
        ...state,
        items: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        item: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        items: state.items.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
}

import {
  FETCH_USERS,
  ADD_USER,
  DELETE_USER,
  GET_USER_DETAILS,
  EDIT_USER,
  SORT_USER,
  SHOW_MODAL,
  CLOSE_MODAL,
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
  direction: {
    firstName: "asc",
    lastName: "asc",
    age: "asc",
    gender: "asc",
  },
  search: "",
  data: { firstName: "", lastName: "", age: "", gender: "" },
  isLoading: false,
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

    case EDIT_USER:
      return {
        ...state,
        items: state.items.map((data) =>
          data.id === action.payload.id
            ? {
                ...data,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                age: action.payload.age,
                gender: action.payload.gender,
              }
            : data
        ),
      };
    case SORT_USER:
      console.log("sort reducer...");
      let name = action.payload;
      return {
        ...state,
        items: [
          ...state.items.sort((a, b) =>
            state.direction[name] === "asc"
              ? a[name] < b[name] && -1
              : a[name] > b[name] && -1
          ),
        ],
        direction: {
          [name]: state.direction[name] === "asc" ? "desc" : "asc",
        },
      };

    case SHOW_MODAL:
      return {
        ...state,
        isLoading: true,
      };

    case CLOSE_MODAL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

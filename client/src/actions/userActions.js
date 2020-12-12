import { FETCH_USERS, ADD_USER, DELETE_USER } from "./types";
import axios from "axios";

export const fetchUsers = () => (dispatch) => {
  console.log("fetching..");
  axios
    .get("/api/users")
    .then((res) =>
      dispatch({
        type: FETCH_USERS,
        payload: res.data,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const addUser = (userData) => (dispatch) => {
  console.log("action called..");
  axios
    .post("/api/users", userData)
    .then((res) =>
      dispatch({
        type: ADD_USER,
        payload: res.data,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const deleteUser = (id) => (dispatch) => {
  console.log("deleted..");
  axios
    .delete("/api/users/" + id)
    .then((res) =>
      dispatch({
        type: DELETE_USER,
        payload: id,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

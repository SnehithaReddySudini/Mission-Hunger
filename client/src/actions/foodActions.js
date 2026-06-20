import axios from "axios";
import { GET_ERRORS,GET_FOOD_LIST } from "./types";

// Add Food
export const addFood = (foodData, history) => (dispatch) => {
  axios
    .post("/api/food/add", foodData)
    .then((res) => history.push("/dashboard")) // Redirect to dashboard after success
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const getAvailableFood = () => (dispatch) => {
  axios
    .get("/api/food/available")
    .then((res) =>
      dispatch({
        type: "GET_FOOD_LIST", // You'll need to define this type in types.js
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// Request Food
export const requestFood = (foodId, history) => (dispatch) => {
  axios
    .post(`/api/food/request/${foodId}`)
    .then((res) => history.push("/dashboard")) // Send them back to dash after requesting
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
export const getMyRequests = () => dispatch => {
  axios
    .get("/api/food/myrequests")
    .then(res =>
      dispatch({
        type: GET_FOOD_LIST, // Reusing the same type to populate the foods array
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
// Get donor's specific listings
export const getMyDonations = () => (dispatch) => {
  axios
    .get("/api/food/mydonations")
    .then((res) =>
      dispatch({
        type: GET_FOOD_LIST,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

// Accept a request
export const acceptRequest = (id) => (dispatch) => {
  axios
    .post(`/api/food/accept/${id}`)
    .then((res) => dispatch(getMyDonations())) // Instantly re-fetch data to sync state changes
    .catch((err) => console.log(err));
};
// Get ALL food items for Admin
export const getAdminFoodList = () => dispatch => {
  axios
    .get("/api/food/admin/all")
    .then(res =>
      dispatch({
        type: GET_FOOD_LIST, // We can reuse your existing reducer action type!
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
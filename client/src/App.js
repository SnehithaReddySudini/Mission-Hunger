import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import AddFood from "./components/dashboard/AddFood";
import ViewFood from "./components/dashboard/ViewFood";
import MyDonations from "./components/dashboard/MyDonations";
import MyRequests from "./components/dashboard/MyRequests";
import AdminHub from "./components/dashboard/AdminHub";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/add-food" component={AddFood} />
            <PrivateRoute exact path="/view-food" component={ViewFood} />
            <PrivateRoute exact path="/my-donations" component={MyDonations} />
  <PrivateRoute exact path="/my-requests" component={MyRequests} />
  <PrivateRoute exact path="/admin-hub" component={AdminHub} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

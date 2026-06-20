import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const role = user.role ? user.role.toLowerCase() : "donor";

    return (
      <div className="container" style={{ width: "90%", marginTop: "2rem" }}>
        {/* Welcome Banner */}
        <div className="row">
          <div className="col s12 d-flex justify-content-between align-items-center">
            <div>
              <h4>Welcome back, <b>{user.name.split(" ")[0]}</b>! 👋</h4>
              <p className="grey-text text-darken-1">
                Account Role: <span className="blue-text text-darken-2" style={{ fontWeight: "bold", textTransform: "uppercase" }}>{role}</span>
              </p>
            </div>
          </div>
        </div>

        {/* High-Impact Metrics Bar */}
        <div className="row" style={{ marginTop: "1rem" }}>
          <div className="col s12 m4">
            <div className="card-panel center-align ux-card lime lighten-5" style={{ padding: "1.5rem" }}>
              <div className="metrics-icon green lighten-4">
                <i className="material-icons green-text">favorite</i>
              </div>
              <h4 style={{ margin: "5px 0", fontWeight: "bold" }}>1,240</h4>
              <p className="grey-text text-darken-2" style={{ margin: 0 }}>Total Meals Shared</p>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel center-align ux-card deep-purple lighten-5" style={{ padding: "1.5rem" }}>
              <div className="metrics-icon deep-purple lighten-4">
                <i className="material-icons deep-purple-text">motorcycle</i>
              </div>
              <h4 style={{ margin: "5px 0", fontWeight: "bold" }}>18</h4>
              <p className="grey-text text-darken-2" style={{ margin: 0 }}>Active NGO Pickups</p>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel center-align ux-card blue lighten-5" style={{ padding: "1.5rem" }}>
              <div className="metrics-icon blue lighten-4">
                <i className="material-icons blue-text">business</i>
              </div>
              <h4 style={{ margin: "5px 0", fontWeight: "bold" }}>42</h4>
              <p className="grey-text text-darken-2" style={{ margin: 0 }}>Partner Organizations</p>
            </div>
          </div>
        </div>

        <div className="divider" style={{ margin: "2rem 0" }}></div>

        {/* Role-Specific Action Cards */}
        <h5 style={{ fontWeight: "bold", marginBottom: "1.5rem" }}>Available Actions</h5>
        <div className="row">
          
          {/* DONOR INTERFACE */}
          {role === "donor" && (
            <>
              <div className="col s12 m6">
                <div className="card hoverable ux-card" style={{ borderTop: "6px solid #4caf50" }}>
                  <div className="card-content center-align">
                    <i className="material-icons large green-text">restaurant</i>
                    <h5><b>Donate Surplus Food</b></h5>
                    <p className="grey-text">Create a fresh listing to alert local NGOs about available excess food items.</p>
                    <Link to="/add-food" className="btn-large green waves-effect waves-light" style={{ marginTop: "1.5rem", borderRadius: "6px" }}>
                      Create Listing
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="card hoverable ux-card" style={{ borderTop: "6px solid #81c784" }}>
                  <div className="card-content center-align">
                    <i className="material-icons large green-text">assignment</i>
                    <h5><b>My Active Donations</b></h5>
                    <p className="grey-text">Track your listed items, view claim requests, and approve NGO distributions.</p>
                    <Link to="/my-donations" className="btn-large green lighten-1 waves-effect waves-light" style={{ marginTop: "1.5rem", borderRadius: "6px" }}>
                      Manage Listings
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* NGO INTERFACE */}
          {role === "ngo" && (
            <>
              <div className="col s12 m6">
                <div className="card hoverable ux-card" style={{ borderTop: "6px solid #673ab7" }}>
                  <div className="card-content center-align">
                    <i className="material-icons large deep-purple-text">search</i>
                    <h5><b>Browse Available Food</b></h5>
                    <p className="grey-text">Explore active food drop listings from donors in your immediate area.</p>
                    <Link to="/view-food" className="btn-large deep-purple waves-effect waves-light" style={{ marginTop: "1.5rem", borderRadius: "6px" }}>
                      Find Food
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="card hoverable ux-card" style={{ borderTop: "6px solid #9575cd" }}>
                  <div className="card-content center-align">
                    <i className="material-icons large deep-purple-text">shopping_cart</i>
                    <h5><b>Our Claim Trackers</b></h5>
                    <p className="grey-text">Check approval status updates on items your organization has requested.</p>
                    <Link to="/my-requests" className="btn-large deep-purple lighten-1 waves-effect waves-light" style={{ marginTop: "1.5rem", borderRadius: "6px" }}>
                      View Requests
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ADMIN INTERFACE */}
          {role === "admin" && (
            <div className="col s12">
              <div className="card hoverable ux-card center-align" style={{ borderTop: "6px solid #2196f3", padding: "1.5rem 0" }}>
                <div className="card-content">
                  <i className="material-icons large blue-text">security</i>
                  <h4><b>System Administration Control</b></h4>
                  <p className="grey-text text-darken-1" style={{ maxWidth: "600px", margin: "0 auto 1.5rem auto" }}>
                    Access the centralized operations framework ledger to track real-time transaction logistics between all registered donors and distribution centers.
                  </p>
                  <Link to="/admin-hub" className="btn-large blue waves-effect waves-light" style={{ borderRadius: "6px", padding: "0 40px" }}>
                    Open Master Tracking Hub
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Global Navigation Actions */}
        <div className="row" style={{ marginTop: "2rem" }}>
          <div className="col s12 center-align">
            <button onClick={this.onLogoutClick} className="btn-flat waves-effect grey-text text-darken-1">
              <i className="material-icons left">power_settings_new</i> Secure Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
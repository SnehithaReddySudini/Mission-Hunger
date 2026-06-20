import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"; // Adjust path if needed

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="navbar-fixed">
        <nav className="z-depth-1 white">
          <div className="nav-wrapper" style={{ width: "90%", margin: "0 auto" }}>
            
            {/* App Brand Title Left */}
            <Link
              to="/"
              style={{ fontFamily: "monospace" }}
              className="brand-logo left black-text"
            >
              <i className="material-icons green-text">restaurant</i>
              <b>MISSION-HUNGER-FREE</b>
            </Link>

            {/* Context Actions Container Right */}
            <ul className="right">
              {isAuthenticated ? (
                <li>
                  <button
                    onClick={this.onLogoutClick}
                    className="btn waves-effect waves-light red darken-1"
                    style={{
                      borderRadius: "4px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      textTransform: "uppercase",
                      fontSize: "13px",
                      padding: "0 15px"
                    }}
                  >
                    <i className="material-icons left" style={{ marginRight: "6px" }}>power_settings_new</i>
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li><Link to="/login" className="black-text">Login</Link></li>
                  <li><Link to="/register" className="black-text">Register</Link></li>
                </>
              )}
            </ul>

          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
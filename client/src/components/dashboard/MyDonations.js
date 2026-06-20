import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMyDonations, acceptRequest } from "../../actions/foodActions";

class MyDonations extends Component {
  componentDidMount() {
    this.props.getMyDonations();
  }

  render() {
    const { foods } = this.props.food;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <Link to="/dashboard" className="btn-flat waves-effect" style={{ marginTop: "1rem" }}>
              <i className="material-icons left">keyboard_backspace</i> Back to Dashboard
            </Link>
            
            <h4><b>My Food</b> Listings</h4>
            <p className="grey-text text-darken-1">
              Track your donation posts and accept open NGO distribution claims below.
            </p>

            {foods && foods.length > 0 ? (
              foods.map(item => (
                <div className="card horizontal blue-grey lighten-5" key={item._id} style={{ borderRadius: "5px" }}>
                  <div className="card-stacked">
                    <div className="card-content">
                      <span className="card-title"><b>{item.foodName}</b></span>
                      <p><b>Quantity:</b> {item.quantity}</p>
                      
                      <p style={{ marginTop: "10px" }}>
                        Status:{" "}
                        <span 
                          className={`white-text badge ${
                            item.status === "accepted" ? "green" : item.status === "requested" ? "orange" : "blue"
                          }`}
                          style={{ padding: "0 10px", borderRadius: "3px", float: "none", marginLeft: "10px" }}
                        >
                          {item.status.toUpperCase()}
                        </span>
                      </p>

                      {/* Show NGO information if requested or accepted */}
                      {item.receiverId ? (
                        <div className="chip-container" style={{ marginTop: "15px", padding: "10px", background: "#e0f2f1", borderRadius: "4px" }}>
                          <p className="teal-text text-darken-4">
                            <i className="material-icons left" style={{ fontSize: "18px", marginRight: "5px" }}>business</i>
                            <b>NGO Claim:</b> {item.receiverId.name} ({item.receiverId.email})
                          </p>
                        </div>
                      ) : (
                        <p className="grey-text" style={{ marginTop: "10px" }}>No active claims on this item yet.</p>
                      )}
                    </div>
                    
                    {item.status === "requested" && (
                      <div className="card-action">
                        <button 
                          onClick={() => this.props.acceptRequest(item._id)}
                          className="btn waves-effect waves-light green accent-4"
                          style={{ letterSpacing: "1px" }}
                        >
                          Accept Request
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="card-panel center-align" style={{ marginTop: "2rem" }}>
                <p className="flow-text">You haven't listed any food items yet.</p>
                <Link to="/add-food" className="btn btn-large waves-effect waves-light green accent-3">
                  Create First Listing
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

MyDonations.propTypes = {
  getMyDonations: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  food: state.food
});

export default connect(mapStateToProps, { getMyDonations, acceptRequest })(MyDonations);
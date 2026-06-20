import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminFoodList } from "../../actions/foodActions";

class AdminHub extends Component {
  componentDidMount() {
    this.props.getAdminFoodList();
  }

  render() {
    const { foods } = this.props.food;

    return (
      <div className="container" style={{ width: "90%", marginTop: "2rem" }}>
        <Link to="/dashboard" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i> Back to Dashboard
        </Link>
        
        <h4><b>Admin Master</b> Tracking Hub</h4>
        <p className="grey-text text-darken-1">
          Overview of all live platform transactions, mapping food item states between Donors and NGOs.
        </p>
        
        <table className="striped responsive-table bordered" style={{ marginTop: "2rem" }}>
          <thead>
            <tr>
              <th>Food Item</th>
              <th>Quantity</th>
              <th>Donor Details</th>
              <th>Status</th>
              <th>Claimed By (NGO)</th>
            </tr>
          </thead>

          <tbody>
            {foods && foods.length > 0 ? (
              foods.map(item => (
                <tr key={item._id}>
                  <td><b>{item.foodName}</b></td>
                  <td>{item.quantity}</td>
                  <td>
                    {item.donorId ? (
                      <div>
                        <b>{item.donorId.name}</b>
                        <br />
                        <span className="grey-text text-darken-1" style={{ fontSize: "12px" }}>
                          {item.donorId.email}
                        </span>
                      </div>
                    ) : (
                      <span className="red-text">Unknown Donor</span>
                    )}
                  </td>
                  {/* --- PASTE THIS NEW PIECE OF CODE INSTEAD --- */}
<td>
  <span 
    className={`white-text status-badge ${
      item.status === "accepted" ? "green" : item.status === "requested" ? "orange" : "blue"
    }`} 
  >
    {item.status === "accepted" ? "COMPLETED" : item.status === "requested" ? "CLAIM PENDING" : "OPEN LISTING"}
  </span>
</td>
                  <td>
                    {item.receiverId ? (
                      <div>
                        <b>{item.receiverId.name}</b>
                        <br />
                        <span className="grey-text text-darken-1" style={{ fontSize: "12px" }}>
                          {item.receiverId.email}
                        </span>
                      </div>
                    ) : (
                      <span className="grey-text"><i>No Active Claims</i></span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="center-align grey-text">
                  <h5>No distribution records currently present in the system database.</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

AdminHub.propTypes = {
  getAdminFoodList: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  food: state.food
});

export default connect(mapStateToProps, { getAdminFoodList })(AdminHub);
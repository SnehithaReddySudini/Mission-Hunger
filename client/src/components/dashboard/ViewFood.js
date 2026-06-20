import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom"; 
import { getAvailableFood, requestFood } from "../../actions/foodActions";

class ViewFood extends Component {
  componentDidMount() {
    this.props.getAvailableFood();
  }

  handleRequest = (id) => {
    this.props.requestFood(id, this.props.history);
  };

  render() {
    const { foods } = this.props.food;

    return (
      <div className="container" style={{ width: "90%", marginTop: "2rem" }}>
        
        {/* Modern Back Nav Link */}
        <Link to="/dashboard" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i> Back to Dashboard
        </Link>

        {/* Dynamic Branding Header */}
        <div style={{ marginTop: "1rem" }}>
          <h4><b>MISSION-HUNGER-FREE</b> Allocation Board</h4>
          <p className="grey-text text-darken-1">
            Review active surplus food supplies across your area network. Request open listings below to begin coordinating distribution.
          </p>
        </div>

        {/* Live Grid Layout */}
        <div className="row" style={{ marginTop: "2.5rem" }}>
          {foods && foods.length > 0 ? (
            foods.map(item => (
              <div className="col s12 m6 l4" key={item._id}>
                
                {/* Individual Modernized Card */}
                <div className="card hoverable ux-card" style={{ borderTop: "6px solid #673ab7" }}>
                  <div className="card-content" style={{ padding: "1.8rem" }}>
                    
                    {/* Food Item Title */}
                    <span className="card-title truncate" style={{ fontWeight: "bold", fontSize: "22px", color: "#212121" }}>
                      {item.foodName}
                    </span>
                    
                    {/* Item Metadata Details with Icons */}
                    <div style={{ margin: "1.5rem 0" }}>
                      <p style={{ margin: "12px 0", display: "flex", alignItems: "center" }} className="grey-text text-darken-3">
                        <i className="material-icons left deep-purple-text text-lighten-2" style={{ fontSize: "20px" }}>layers</i>
                        <span><b>Quantity:</b> {item.quantity}</span>
                      </p>
                      
                      <p style={{ margin: "12px 0", display: "flex", alignItems: "center" }} className="grey-text text-darken-3">
                        <i className="material-icons left deep-purple-text text-lighten-2" style={{ fontSize: "20px" }}>account_circle</i>
                        <span><b>Donor:</b> {item.donorId ? item.donorId.name : "Verified Partner"}</span>
                      </p>

                      {item.description && (
                        <p style={{ margin: "12px 0", display: "flex", alignItems: "flex-start" }} className="grey-text text-darken-1">
                          <i className="material-icons left deep-purple-text text-lighten-2" style={{ fontSize: "20px", marginTop: "2px" }}>assignment</i>
                          <span><i>{item.description}</i></span>
                        </p>
                      )}
                    </div>

                    <div className="divider" style={{ margin: "1.2rem 0" }}></div>

                    {/* Action Call Button */}
                    <div className="center-align" style={{ marginTop: "1rem" }}>
                      <button 
                        onClick={() => this.handleRequest(item._id)}
                        className="btn-large deep-purple waves-effect waves-light"
                        style={{ borderRadius: "6px", width: "100%", fontWeight: "bold", fontSize: "14px", letterSpacing: "0.5px" }}
                      >
                        Request Food Item
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            ))
          ) : (
            /* Premium Empty State Fallback Interface */
            <div className="col s12 center-align" style={{ padding: "4rem 0" }}>
              <div style={{ background: "#f5f5f5", display: "inline-block", padding: "2rem", borderRadius: "50%", marginBottom: "1rem" }}>
                <i className="material-icons large grey-text text-lighten-1">cloud_off</i>
              </div>
              <h5 className="grey-text text-darken-1">No food available right now.</h5>
              <p className="grey-text">Fresh donor allocations will appear automatically as soon as they log surplus supplies.</p>
            </div>
          )}
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  food: state.food,
  auth: state.auth
});

export default connect(mapStateToProps, { getAvailableFood, requestFood })(withRouter(ViewFood));
import React, { Component } from "react";
import { connect } from "react-redux";
import { getMyRequests } from "../../actions/foodActions";

class MyRequests extends Component {
  componentDidMount() {
    this.props.getMyRequests();
  }

  render() {
    const { foods } = this.props.food;

    return (
      <div className="container">
        <h4><b>My</b> Food Requests</h4>
        <div className="row">
          {foods && foods.length > 0 ? (
            foods.map(item => (
              <div className="col s12" key={item._id}>
                <div className={`card horizontal ${item.status === 'accepted' ? 'green lighten-5' : 'blue-grey lighten-5'}`}>
                  <div className="card-stacked">
                    <div className="card-content">
                      <span className="card-title"><b>{item.foodName}</b></span>
                      <p>Status: <b className={item.status === 'accepted' ? 'green-text' : 'orange-text'}>
                        {item.status.toUpperCase()}
                      </b></p>
                      <p><b>Donor:</b> {item.donorId.name} ({item.donorId.email})</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>You haven't requested any food yet.</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ food: state.food });
export default connect(mapStateToProps, { getMyRequests })(MyRequests);
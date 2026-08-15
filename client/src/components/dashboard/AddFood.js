import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addFood } from "../../actions/foodActions";
import classnames from "classnames";
import axios from "axios";

class AddFood extends Component {
  constructor() {
    super();

    this.state = {
      foodName: "",
      quantity: "",
      description: "",
      errors: {},
      generatingDescription: false,
      aiError: "",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  generateDescription = async () => {
    const { foodName, quantity, description } = this.state;

    // Make sure the donor has entered some information
    if (!foodName && !quantity && !description) {
      this.setState({
        aiError: "Please enter some food details before generating a description.",
      });
      return;
    }

    this.setState({
      generatingDescription: true,
      aiError: "",
    });

    try {
      const keywords = `
Food name: ${foodName}
Quantity: ${quantity}
Additional details: ${description}
      `;

      const res = await axios.post(
        "/api/donations/generate-description",
        {
          keywords,
        }
      );

      this.setState({
        description: res.data.description,
        generatingDescription: false,
        aiError: "",
      });
    } catch (error) {
      console.error("AI description error:", error);

      this.setState({
        generatingDescription: false,
        aiError:
          error.response?.data?.message ||
          "Unable to generate description. Please enter it manually.",
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newFood = {
      foodName: this.state.foodName,
      quantity: this.state.quantity,
      description: this.state.description,
    };

    this.props.addFood(newFood, this.props.history);
  };

  render() {
    const {
      errors,
      generatingDescription,
      aiError,
    } = this.state;

    return (
      <div className="container" style={{ marginTop: "3rem" }}>
        <div className="row">
          <div className="col s12 m8 offset-m2">

            {/* Back Button */}
            <Link
              to="/dashboard"
              className="btn-flat waves-effect"
            >
              <i className="material-icons left">
                keyboard_backspace
              </i>
              Back to Dashboard
            </Link>

            {/* Form Card */}
            <div
              className="card hoverable ux-card"
              style={{
                marginTop: "1.5rem",
                borderTop: "6px solid #4caf50",
              }}
            >
              <div
                className="card-content"
                style={{ padding: "2.5rem" }}
              >

                {/* Header */}
                <span className="card-title">
                  <i
                    className="material-icons left green-text"
                    style={{
                      fontSize: "2.5rem",
                      marginRight: "10px",
                    }}
                  >
                    restaurant
                  </i>

                  <h4
                    style={{
                      margin: 0,
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                  >
                    <b>MISSION-HUNGER-FREE</b>
                  </h4>
                </span>

                <p
                  className="grey-text text-darken-1"
                  style={{
                    marginTop: "0.5rem",
                    marginBottom: "2rem",
                  }}
                >
                  Log your surplus food items below so local
                  distribution networks and NGOs can claim them instantly.
                </p>

                <form noValidate onSubmit={this.onSubmit}>

                  {/* Food Name */}
                  <div
                    className="input-field col s12"
                    style={{
                      marginBottom: "1.5rem",
                      padding: 0,
                    }}
                  >
                    <i className="material-icons prefix grey-text">
                      restaurant_menu
                    </i>

                    <input
                      onChange={this.onChange}
                      value={this.state.foodName}
                      id="foodName"
                      type="text"
                      className="validate"
                      required
                    />

                    <label htmlFor="foodName">
                      Food Name (e.g., Rice, Sandwiches, Veg Meals)
                    </label>
                  </div>

                  {/* Quantity */}
                  <div
                    className="input-field col s12"
                    style={{
                      marginBottom: "1.5rem",
                      padding: 0,
                    }}
                  >
                    <i className="material-icons prefix grey-text">
                      layers
                    </i>

                    <input
                      onChange={this.onChange}
                      value={this.state.quantity}
                      id="quantity"
                      type="text"
                      className="validate"
                      required
                    />

                    <label htmlFor="quantity">
                      Quantity (e.g., 5kg, 10 plates, 30 servings)
                    </label>
                  </div>

                  {/* Description */}
                  <div
                    className="input-field col s12"
                    style={{
                      marginBottom: "1rem",
                      padding: 0,
                    }}
                  >
                    <i className="material-icons prefix grey-text">
                      assignment
                    </i>

                    <textarea
                      onChange={this.onChange}
                      value={this.state.description}
                      id="description"
                      className="materialize-textarea"
                      required
                    ></textarea>

                    <label htmlFor="description">
                      Description / Shelf-life / Pickup Instructions
                    </label>
                  </div>

                  {/* AI Error */}
                  {aiError && (
                    <div
                      className="red-text"
                      style={{
                        marginBottom: "1rem",
                      }}
                    >
                      {aiError}
                    </div>
                  )}

                  {/* AI Button */}
                  <div
                    className="center-align"
                    style={{
                      marginBottom: "2rem",
                    }}
                  >
                    <button
                      type="button"
                      onClick={this.generateDescription}
                      disabled={generatingDescription}
                      className="btn waves-effect waves-light"
                      style={{
                        borderRadius: "6px",
                        fontWeight: "bold",
                      }}
                    >
                      <i className="material-icons left">
                        auto_awesome
                      </i>

                      {generatingDescription
                        ? "Generating..."
                        : "Generate Description with AI"}
                    </button>
                  </div>

                  {/* Submit */}
                  <div className="center-align">
                    <button
                      type="submit"
                      className="btn-large green waves-effect waves-light"
                      style={{
                        borderRadius: "6px",
                        width: "100%",
                        fontWeight: "bold",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Publish Active Donation Listing
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { addFood }
)(withRouter(AddFood));
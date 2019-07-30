import React, { Component } from "react";
import "./Map.css"

class MapForm extends Component {
  // On input change update the state with the values from the inputs
  // If the submit button is clicked post the state object to the database
  state = {
      latitude: "",
      longitude: ""
  };

  clearFields = () =>
  {

  }

  calculateCenter = (event) => {
    event.preventDefault()
    this.props.calculateCenter()
  }

  checkFields = (event) => {
      event.preventDefault()
      this.props.addLocation(this.state)
      this.clearFields()
  };

  handleFieldChange = event => {
    if (event.target.id.includes("lat"))
    {
        this.setState({latitude: +event.target.value})
    }
    else
    {
        this.setState({longitude: +event.target.value})
    }
    // Just fill the latitude and longitude fields for one set of inputs
    // User must start with the first set of inputs and submit that location
  };

  // Renders an input for name date and location
  render() {
    //if there is an active user
    return (
      <React.Fragment>
        <form className="MapForm">
          <div className="form-group" id="location-1">
            <label htmlFor="name">Lat 1</label>
            <input
              type="text"
              key="lat"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="lat1"
            />
            <label htmlFor="date">Long 1</label>
            <input
              type="text"
              key="long"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="long1"
            />
            <button
              type="submit"
              onClick={this.checkFields}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
          <div className="form-group">
            <button
              type="submit"
              onClick={this.calculateCenter}
              className="btn btn-primary"
            >
              Calculate
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default MapForm;
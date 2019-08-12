// Daniel Krusch
import React, { Component } from "react";
// import "./Event.css"

class AddLocationForm extends Component {
  // On input change update the state with the values from the inputs
  // If the submit button is clicked post the state object to the database
  state = {
    name: "",
    latitude: "",
    longitude: "",
    central: false,
    user_id: +sessionStorage.getItem("activeUser")
  };

  clearFields = () =>
  {
      document.getElementById("name").value = ""
      document.getElementById("latitude").value = ""
      document.getElementById("longitude").value = ""
  }

  checkFields = (event) => {
    event.preventDefault()

    // Thank you guy from stack overflow https://stackoverflow.com/questions/22903756/using-regular-expression-to-validate-latitude-and-longitude-coordinates-then-dis
    const latRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g;
    const lngRegex = /^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g;

    if (latRegex.exec(this.state.latitude) && lngRegex.exec(this.state.longitude))
    {
        this.props.addItem("locations", this.state)
        this.clearFields()
    }
    else
    {
     alert("Please enter valid coordinates")
    }
  };

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  // Renders an input for name date and location
  render() {
    //if there is an active user
    return (
      <React.Fragment>
        <form className="eventForm">
          <div className="form-group">
            <input
              type="text"
              required
              className="form-control add-input"
              onChange={this.handleFieldChange}
              placeHolder="Name"
              id="name"
              value={this.state.eventName}
            />
            <input
              type="text"
              required
              className="form-control add-input"
              onChange={this.handleFieldChange}
              placeHolder="Latitude"
              id="latitude"
              value={this.state.eventDate}
            />
            <input
              type="text"
              required
              className="form-control add-input"
              onChange={this.handleFieldChange}
              placeHolder="Longitude"
              id="longitude"
              value={this.state.eventlocation}
            />
            <button
              type="submit"
              onClick={this.checkFields}
              className="add-button"
            >
              Submit
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AddLocationForm;

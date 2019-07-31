import React, { Component } from "react";
import "./Map.css"

class MapForm extends Component {
  // On input change update the state with the values from the inputs
  // If the submit button is clicked post the state object to the database
  state = {
      latitude: "",
      longitude: "",
      style: "normal"
  };

  clearFields = () =>
  {

  }

  calculateCenter = (event) => {
    event.preventDefault()
    this.props.calculateCenter()
  }

  showDiv = (event) => {
    let name = event.target.value
    let forms = document.querySelectorAll(".form-group")
    Array.from(forms).map(form => form.style.display = "none")
    console.log(forms)
    document.querySelector(`#${name}-form`).style.display = "block"
  }

  checkFields = (event) => {
    event.preventDefault()

    // Thank you guy from stack overflow https://stackoverflow.com/questions/22903756/using-regular-expression-to-validate-latitude-and-longitude-coordinates-then-dis
    const latRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g;
    const lngRegex = /^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g;

    if (latRegex.exec(this.state.latitude) && lngRegex.exec(this.state.longitude))
    {
        console.log(this.state.longitude)
        this.props.addLocation(this.state)
        this.clearFields()
    }
    else
    {
     alert("Please enter valid coordinates")
    }
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
    let dontshow = {
        display: "none"
      };

    return (
      <React.Fragment>
        <form className="MapForm">
          <section className="radio-choice">
            <input type="radio" name="inputtype" value="user" onClick={this.showDiv}></input>
            <label htmlFor="user">Your Locations</label>
            <input type="radio" name="inputtype" value="friend" onClick={this.showDiv}></input>
            <label htmlFor="friend">Friend Locations</label>
            <input type="radio" name="inputtype" value="manual" onClick={this.showDiv} defaultChecked></input>
            <label htmlFor="manual">Manual Location</label>
          </section>
          <div className="form-group" style={dontshow} id="user-form">
            <label htmlFor="name">User:</label>
            <input
              type="text"
              key="lat"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="lat1"
            />
            <label htmlFor="date">Longitude:</label>
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
          <div className="form-group" style={dontshow} id="friend-form">
            <label htmlFor="name">Friend:</label>
            <input
              type="text"
              key="lat"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="lat1"
            />
            <label htmlFor="date">Longitude:</label>
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
          <div className="form-group" id="manual-form">
            <label htmlFor="name">Latitude:</label>
            <input
              type="text"
              key="lat"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="lat1"
            />
            <label htmlFor="date">Longitude:</label>
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
          <div className="submit-group">
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
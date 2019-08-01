import React, { Component } from "react";
import FriendLocations from "./FriendLocations"
import "./Map.css"

class MapForm extends Component {
  // On input change update the state with the values from the inputs
  // If the submit button is clicked post the state object to the database
  state = {
      latitude: "",
      longitude: "",
      style: "normal",
      selectedFriend: ""
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
    document.querySelector(`#${name}-form`).style.display = "flex"
  }

  checkManualFields = (event) => {
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

  checkDropdown = event => {
    event.preventDefault()

    // the submit button id
    let id = event.target.id.split("-")[0]
    let dropdown = document.querySelector(`.${id}-location`)
    let selectedLocation = this.props.locations.find(location => location.name === dropdown.value)

    // Sets the state with the values from the dropdowns, waits, then sends the state into the passed function
    this.setState(
        {latitude: +selectedLocation.latitude, longitude: +selectedLocation.longitude},
        () => this.props.addLocation(this.state))
  };

  generateFriendLocations = event => {
    this.props.setFriend(event.target.value.split("-")[1])
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
            <label htmlFor="name">Saved Locations:</label>
            <select className="user-location">
                {this.props.userLocations.map((location, i) =>
                    {
                        return <option key={`user-location-${i}`} value={`${location.name}`}>{location.name}</option>
                    }
                    )}
            </select>
            <button
              type="submit"
              id="user-submit"
              onClick={this.checkDropdown}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
          <div className="form-group" style={dontshow} id="friend-form">
            <label htmlFor="name">Friends:</label>
            <select className="friend-option" onChange={this.generateFriendLocations}>
                <option key={`friend-option-0`} value="" defaultValue>Pick a friend...</option>
                {this.props.userFriends.map((friend, i) =>
                    {
                        return <option key={`friend-option-${i+1}`} value={`friend-${friend.id}`} id={`friend-${friend.id}`}>{friend.username}</option>
                    }
                    )}
            </select>
            <label htmlFor="date">Their Locations:</label>
            <FriendLocations friendLocations={this.props.friendLocations}/>
            <button
              type="submit"
              id="friend-submit"
              onClick={this.checkDropdown}
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
              onClick={this.checkManualFields}
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
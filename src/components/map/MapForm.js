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
    const inputs = document.querySelectorAll(".form-control")
    Array.from(inputs).forEach(input => input.value = "")
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
        const coords = this.props.coordinates
        console.log(coords)
        const lastIndex = coords.length - 1
        if (coords.length !== 0 && coords[lastIndex].style === "center")
        {
          const submit = true
          console.log(coords)
          console.log("helloooooooooo", coords[lastIndex].style)
          this.props.clearAllMarkersSubmit(submit, this.state)
          this.clearFields()
        }
        else
        {
          console.log(this.state.longitude)
          this.props.addLocation(this.state)
          this.clearFields()
        }
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
    const index = dropdown.options[dropdown.selectedIndex]
    console.log("INDEX", index.value)
    if (+index.value !== 0)
    {
      let selectedLocation = this.props.locations.find(location => location.name === dropdown.value)
      console.log("you checking the dropdown")
      const coords = this.props.coordinates
      const lastIndex = coords.length - 1
      if (coords.length !== 0 && coords[lastIndex].style === "center")
      {
        const submit = true

        // Sets the state with the values from the dropdowns, waits, then sends the state into the passed function
        this.setState(
          {latitude: +selectedLocation.latitude, longitude: +selectedLocation.longitude},
          () => this.props.clearAllMarkersSubmit(submit, this.state))
      }
      else
      {
        console.log("New thing", selectedLocation)
        console.log("New thing", this.props.locations)
        this.setState(
          {latitude: +selectedLocation.latitude, longitude: +selectedLocation.longitude},
          () => this.props.addLocation(this.state))
      }
    }
    else
    {
      alert("Sorry, that is not a valid location.")
    }
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

  disableClearButtons = coordinates => {
    if (coordinates.length === 0)
    {
      console.log("here i am", coordinates)
      return <div className="clear-buttons"><button
      type="button"
      id="clear"
      onClick={this.props.clearMarkers}
      disabled
      className="add-button-map-disabled"
      >
        Clear Marker
      </button>
      <div className="submit-group">
              {this.disableCalculate(this.props.coordinates)}
      </div>
      <button
      type="button"
      id="clear"
      onClick={this.props.clearAllMarkers}
      disabled
      className="add-button-map-disabled"
      >
        Clear All
      </button>
      </div>
    }
    else if (coordinates.length === 1)
    {
      console.log("here i amnt", coordinates)
      return <div className="clear-buttons"><button
      type="button"
      id="clear"
      onClick={this.props.clearMarkers}
      className="add-button-map"
      >
        Clear Marker
      </button>
      <div className="submit-group">
              {this.disableCalculate(this.props.coordinates)}
      </div>  
      <button
      type="button"
      id="clear"
      onClick={this.props.clearAllMarkers}
      disabled
      className="add-button-map-disabled"
      >
        Clear All
      </button>
      </div>
    }
    else
    {
      console.log("here i amnt", coordinates)
      return <div className="clear-buttons"><button
      type="button"
      id="clear"
      onClick={this.props.clearMarkers}
      className="add-button-map"
      >
        Clear Marker
      </button>
      <div className="submit-group">
              {this.disableCalculate(this.props.coordinates)}
      </div>
      <button
      type="button"
      id="clear"
      onClick={this.props.clearAllMarkers}
      className="add-button-map"
      >
        Clear All
      </button>
      </div>
    }
  }

  disableCalculate = coordinates => {
    if (coordinates.length > 1)
    {
      return <button
      type="submit"
      onClick={this.calculateCenter}
      className="add-button-calculate"
      >
        Calculate Center
      </button>
    }
    else
    {
      return <button
        type="submit"
        onClick={this.calculateCenter}
        disabled
        className="add-button-calculate-disabled"
      >
        Calculate Center
      </button>
    }
  }

  // Renders an input for name date and location
  render() {
    //if there is an active user
    let dontshow = {
        display: "none"
      };

    return (
      <React.Fragment>
        <form className="MapForm">
          <div className="first-group">
            <div className="form-group" id="user-form">
              <select className="user-location datalist-map-location a">
                  <option key={`location-option-0`} value="0" defaultValue>Pick a location...</option>
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
                className="add-button-map"
              >
                Submit
              </button>
            </div>
            <div className="form-group" id="friend-form">
            <select className="friend-option datalist-map-friend" onChange={this.generateFriendLocations}>
                <option key={`friend-option-0`} value="0" defaultValue>Pick a friend...</option>
                {this.props.userFriends.map((friend, i) =>
                    {
                        return <option key={`friend-option-${i+1}`} value={`friend-${friend.id}`} id={`friend-${friend.id}`}>{friend.username}</option>
                    }
                    )}
            </select>
            <FriendLocations friendLocations={this.props.friendLocations}/>
            <button
              type="submit"
              id="friend-submit"
              onClick={this.checkDropdown}
              className="add-button-map"
            >
              Submit
            </button>
            </div>
            <div className="form-group" id="manual-form">
            <input
              type="text"
              key="lat"
              required
              className="datalist-map"
              placeholder="Latitude"
              onChange={this.handleFieldChange}
              id="lat1"
            />
            <input
              type="text"
              key="long"
              required
              className="datalist-map"
              placeholder="Longitude"
              onChange={this.handleFieldChange}
              id="long1"
            />
            <button
              type="submit"
              onClick={this.checkManualFields}
              className="add-button-map"
            >
              Submit
            </button>
            </div>
            <div className="button-form-clear">
              {this.disableClearButtons(this.props.coordinates)}
            </div>
            <div className="button-form-calculate">
            {/* <div className="submit-group">
              {this.disableCalculate(this.props.coordinates)}
            </div> */}
          </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default MapForm;
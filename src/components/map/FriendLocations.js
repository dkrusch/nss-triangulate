import React, { Component } from "react";
import "./Map.css"

class FriendLocations extends Component {
  // On input change update the state with the values from the inputs
  // If the submit button is clicked post the state object to the database
  state = {
  };

  // Renders an input for name date and location
  render() {
    //if there is an active user
    console.log(this.props.locations)
    console.log(this.props.selectedFriend)

    return (
      <React.Fragment>
            <select className="friend-option" onChange={this.generateFriendLocations}>
                <option key={`friend-option-0`} value="" defaultValue>Pick a location...</option>
                {
                    this.props.friendLocations
                    .map((location, i) =>
                    {
                        console.log("location", location)
                        return <option key={`user-location-${i}`} value={`${location.name}`}>{location.name}</option>
                    })
                }
            </select>
      </React.Fragment>
    );
  }
}

export default FriendLocations;
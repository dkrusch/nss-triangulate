//Daniel Krusch
import React, { Component } from "react"
import AddLocationForm from "./AddLocationForm"
import AddFriendForm from "./AddFriendForm"
import "./Add.css"

class Add extends Component {
  state = {
    locations: [],
    friends: []
  }

  handleFieldChange = event => {
    const stateToChange = {};
    let key = event.target.id.split("-")[0]
    stateToChange[key] = event.target.value;
    this.setState(stateToChange);
  };

  setObject = (object) => {
      this.setState({name: object.name})
      this.setState({latitude: object.latitude})
      this.setState({longitude: object.longitude})

  }

  showDiv = (event, object) => {
    let id = event.target.id.split("-")[2]
    let type = event.target.id.split("-")[0]
    this.setObject(object)
    if (type === "edit")
    {
        document.getElementById(`name-${id}`).value = object.name
        document.getElementById(`latitude-${id}`).value = object.latitude
        document.getElementById(`longitude-${id}`).value = object.longitude
        document.getElementById(`show-location-${id}`).style.display = "none"
        document.getElementById(`edit-location-${id}`).style.display = "flex"
    }
    else
    {
        object.name = this.state.name
        object.latitude = this.state.latitude
        object.longitude = this.state.longitude
        this.props.updateItem("locations", object)
        document.getElementById(`show-location-${id}`).style.display = "flex"
        document.getElementById(`edit-location-${id}`).style.display = "none"
    }
  }



  // Supposed to hold the date of the closest event when it is updated, the changed value will turn to true

  // Render contains the events list and the event form which has the inputs to make a new list
  render() {
      let dontshow = {
        display: "none"
      };
      //if there is an active user
      console.log(this.props.userLocations)
      return (
        <React.Fragment>
          <div className="add-locations">
            <div className="list-form">
                <AddLocationForm addItem={this.props.addItem}/>
                <section className="events">
                {
                    // Sorts the events from the database by date, based on unix time
                    this.props.userLocations.map((location) =>
                    {
                            return <div key={location.id} className="card card--location" id="soonest">
                                    <div className="card-body" id={`show-location-${location.id}`}>
                                        <div className="card-title">
                                            <h5>{location.name}</h5>
                                            <h6>Latitude: {location.latitude}</h6>
                                            <h6>Longitude: {location.longitude}</h6>
                                            <button
                                            type="submit"
                                            onClick={(e) => this.showDiv(e, location)}
                                            className="btn btn-primary"
                                            id={`edit-button-${location.id}`}
                                            >
                                            Edit
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body" style={dontshow} id={`edit-location-${location.id}`}>
                                        <label htmlFor="name">Name:</label>
                                        <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id={`name-${location.id}`}
                                        />
                                        <label htmlFor="name">Latitude:</label>
                                        <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id={`latitude-${location.id}`}
                                        />
                                        <label htmlFor="date">Longitude:</label>
                                        <input
                                        type="text"
                                        key="long"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id={`longitude-${location.id}`}
                                        />
                                        <button
                                        type="submit"
                                        onClick={(e) => this.showDiv(e, location)}
                                        className="btn btn-primary"
                                        id={`submit-button-${location.id}`}
                                        >
                                        Submit
                                        </button>
                                    </div>
                                </div>
                    })
                }
                </section>
            </div>
            <div className="list-form">
                <AddFriendForm userFriends={this.props.userFriends}/>
                <section className="events">
                {
                    // Sorts the events from the database by date, based on unix time
                    this.props.userFriends.map((friend, i) =>
                    {
                            return <div key={friend.id} className="card card--friend" id="soonest">
                                    <div className="card-body">
                                        <div className="card-title">
                                            <h5>{friend.username}</h5>
                                            <h6>{friend.email}</h6>
                                        </div>
                                    </div>
                                </div>
                    })
                }
                </section>
            </div>
          </div>
        </React.Fragment>
      )
  }
}

export default Add



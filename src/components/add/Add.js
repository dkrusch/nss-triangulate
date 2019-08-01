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

  // Supposed to hold the date of the closest event when it is updated, the changed value will turn to true

  // Render contains the events list and the event form which has the inputs to make a new list
  render() {
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
                                    <div className="card-body">
                                        <div className="card-title">
                                            <h5>{location.name}</h5>
                                            <h6>Latitude: {location.latitude}</h6>
                                            <h6>Longitude: {location.longitude}</h6>
                                        </div>
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



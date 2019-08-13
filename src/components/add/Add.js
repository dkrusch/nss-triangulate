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

  deleteItem = (event, id) => {
    let type = event.target.id.split("-")[1]
    console.log(id)
    if (type === "location")
    {
      this.props.deleteItem("locations", id)
    }
    else
    {
      this.props.deleteItem("friends", id)
    }
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
      // Thank you guy from stack overflow https://stackoverflow.com/questions/22903756/using-regular-expression-to-validate-latitude-and-longitude-coordinates-then-dis
        const latRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g;
        const lngRegex = /^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g;

        if (latRegex.exec(this.state.latitude) && lngRegex.exec(this.state.longitude))
        {
          object.name = this.state.name
          object.latitude = this.state.latitude
          object.longitude = this.state.longitude
          this.props.updateItem("locations", object)
          document.getElementById(`show-location-${id}`).style.display = "flex"
          document.getElementById(`edit-location-${id}`).style.display = "none"
        }
        else
        {
          alert("Please enter valid coordinates")
        }
    }
  }



  // Supposed to hold the date of the closest event when it is updated, the changed value will turn to true

  // Render contains the events list and the event form which has the inputs to make a new list
  render() {
      let dontshow = {
        display: "none"
      };
      //if there is an active user
      return (
        <React.Fragment>
          <div className="add">
            <div className="add-locations">
              <div className="list-form-locations">
                  <div>Add A Location:</div>
                  <AddLocationForm addItem={this.props.addItem}/>
                  <section className="events">
                  {
                      // Sorts the events from the database by date, based on unix time
                      this.props.userLocations.map((location) =>
                      {
                              return <div key={location.id} className="card--location add-card" id="soonest">
                                      <div id={`show-location-${location.id}`}>
                                          <div className="card-title single-card">
                                            <div className="submit-group">
                                              <h5>{location.name}</h5>
                                              <h6>Latitude: {location.latitude}</h6>
                                              <h6>Longitude: {location.longitude}</h6>
                                            </div>  
                                            <div className="clear-group">
                                              <button
                                              type="submit"
                                              onClick={(e) => this.showDiv(e, location)}
                                              className="add-button"
                                              id={`edit-button-${location.id}`}
                                              >
                                              Edit
                                              </button>
                                              <button
                                              type="submit"
                                              onClick={(e) => this.deleteItem(e, location.id)}
                                              className="add-button"
                                              id={`delete-location-${location.id}`}
                                              >
                                              Delete
                                              </button>
                                            </div>
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
                                          className="add-button"
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
              <div className="add-line">sorry</div>
              <div className="list-form-friends">
                <div>Add A Friend:</div>
                  {console.log(this.props.userFriends)}
                  <AddFriendForm users={this.props.users} addItem={this.props.addItem} strangers={this.props.strangers}/>
                  <section className="events">
                  {
                      // Sorts the events from the database by date, based on unix time
                      this.props.userFriends.map((friend) =>
                      {
                              return <div key={friend.id} className="card--friend add-card" id="soonest">
                                      <div className="card-body">
                                          <div className="card-title">
                                              <h5>{friend.username}</h5>
                                              <h6>{friend.email}</h6>
                                          </div>
                                      </div>
                                      <button
                                              type="submit"
                                              onClick={(e) => this.deleteItem(e, friend.join_id)}
                                              className="add-button"
                                              id={`delete-user-${friend.id}`}
                                              >
                                              Delete
                                      </button>
                                  </div>
                      })
                  }
                  </section>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
  }
}

export default Add



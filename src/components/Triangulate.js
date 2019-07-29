import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
// import "./Nutshell.css"

class Triangulate extends Component {
  state = {
    id: ""
  }

  isAuthenticated = () => {
    return sessionStorage.getItem("activeUser") !== null
  }

//   setUser = activeUserId => {
//     //return one user
//     let newState = {}
//     newState.activeUser = activeUserId
//     this.setState(newState)
//   }

  render() {
    if (this.isAuthenticated()) {
      //if there is an active user
      return (
        <React.Fragment>
          <NavBar />
          <ApplicationViews
            // activeUser={this.state.activeUser}
            // setUser={this.setUser}
          />
        </React.Fragment>
      )
    } else {
      // there is no active user
      return (
        <React.Fragment>
          <ApplicationViews
            // activeUser={this.state.activeUser}
            // setUser={this.setUser}
          />
        </React.Fragment>
      )
    }
  }
}

export default Triangulate

import React, { Component } from "react"
// import NavBar from "./nav/NavBar"
// import ApplicationViews from "./ApplicationViews"
// import "./Nutshell.css"

class Triangulate extends Component {
  buttonClick = event =>
  {
      if (event.target.id === "login")
      {
          this.props.history.push("/login")
      }
      else if (event.target.id === "register")
      {
          this.props.history.push("/register")
      }
  }

  render() {
    return (
    <React.Fragment>
        <button id="login" onClick={this.buttonClick}>Login</button>
        <button id="register" onClick={this.buttonClick}>Register</button>
    </React.Fragment>
    )
  }
}

export default Triangulate

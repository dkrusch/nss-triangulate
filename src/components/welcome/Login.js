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
        <div>Wuts up</div>
    </React.Fragment>
    )
  }
}

export default Triangulate

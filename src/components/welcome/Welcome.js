import React, { Component } from "react"
// import NavBar from "./nav/NavBar"
// import ApplicationViews from "./ApplicationViews"
// import "./Nutshell.css"
import "./Welcome.css"

class Welcome extends Component {
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
        <div className="center">
          <div className="form">
            <h1 className="title">Triangulate</h1>
            <div className="button-form">
              <button className="button" id="login" onClick={this.buttonClick}>Login</button>
              <div className="line"></div>
              <button className="button" id="register" onClick={this.buttonClick}>Register</button>
            </div>
          </div>
        </div>
    </React.Fragment>
    )
  }
}

export default Welcome

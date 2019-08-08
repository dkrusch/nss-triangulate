//Group
//Queries db for user id and sets session storage to id
import React, { Component } from 'react'
import "./Welcome.css"

export default class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  handleSubmit = (event) => {
      //fetch
      fetch(`http://localhost:5002/users?username=${this.state.username}`)
        .then(res => res.json())
        .then(user => {
          //check for matching
          if (user.length === 0) window.alert("no user found!")
          else if (user[0].password === this.state.password) {
            console.log(user[0])
            //set sessionStorage
            sessionStorage.setItem("activeUser", user[0].id)
            this.props.setUser(user[0].id)
            //routing to dashboard
            this.props.history.push("/triangulate")
          }
          else window.alert("That password is incorrect")
        console.log(user)
      })
  }

  render() {
    console.log(this.props)
    return (
      <div className="center">
        <div className="form">
          <div className="title"><h1>Log In</h1></div>
          <div className="input-form">
              <input
                autoFocus
                id="username"
                className="welcome-input"
                placeholder="Enter Username..."
                onChange={this.handleFieldChange}
              />
              <input
                id="password"
                className="welcome-input"
                placeholder="Enter Password..."
                onChange={this.handleFieldChange}
              />
          <button className="submit" onClick={this.handleSubmit}>
            Log In
          </button>
          </div>
        </div>
      </div>
    )
  }
}

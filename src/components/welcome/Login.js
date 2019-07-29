//Group
//Queries db for user id and sets session storage to id
import React, { Component } from 'react'

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
            this.props.history.push("/")
          }
          else window.alert("That password is incorrect")
        console.log(user)
      })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Please Login</h1>
        <input
          autoFocus
          id="username"
          placeholder="username"
          onChange={this.handleFieldChange}
        />
        <input
          id="password"
          placeholder="password"
          onChange={this.handleFieldChange}
        />
        <button onClick={this.handleSubmit}>
          login
        </button>
      </div>
    )
  }
}

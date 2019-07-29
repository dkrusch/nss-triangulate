import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import Welcome from "./welcome/Welcome"
import Login from "./welcome/Login"
import Register from "./welcome/Register"
import APIManager from "../modules/APIManager"
import { withRouter } from "react-router"
import MapPage from "./map/Map";

class ApplicationViews extends Component {
  state = {
    locations: [],
    friends: []
  }


  //Methods to be passed to components
  likeItem = (name, word) => {
    console.log("inside delete item")
    let newObj = {}
    return APIManager.getLike(name, word)
    .then(group => {
      console.log(group)
      newObj["potentialFriends"] = group
      this.setState(newObj)
      console.log(name, newObj, this.state)
      this.props.history.push(`/friends/search`)
    })
  }


  deleteItem = (name, id) => {
    console.log("inside delete item")
    let newObj = {}
    return fetch(`http://localhost:5002/${name}/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => APIManager.getAll(`${name}?user_id=${+sessionStorage.getItem("activeUser")}`
      ))
      .then(group => {
        newObj[name] = group
        this.setState(newObj)
        console.log(name, newObj, this.state)
        this.props.history.push(`/${name}`)
      })
  }
  deleteMessage = (name, id) => {
    console.log("inside delete item")
    let newObj = {}
    return fetch(`http://localhost:5002/${name}/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => APIManager.getAll(`${name}`
      ))
      .then(group => {
        newObj[name] = group
        this.setState(newObj)
        console.log(name, newObj, this.state)
        this.props.history.push(`/${name}`)
      })
  }
  updateItem = (name, editedObject) => {
    let newObj = {}
    return APIManager.put(name, editedObject)
      .then(() =>
        APIManager.getAll(
          `${name}?user_id=${+sessionStorage.getItem("activeUser")}`
        )
      )
      .then(item => {
        newObj[name] = item
        this.setState(newObj)
      })
      .then(() => this.props.history.push(`/${name}`))
  }

  updateMessage = (name, editedObject) => {
    let newObj = {}
    return APIManager.put(name, editedObject)
      .then(() =>
        APIManager.getAll(
          `${name}`
        )
      )
      .then(item => {
        newObj[name] = item
        this.setState(newObj)
      })
      .then(() => this.props.history.push(`/${name}`))
  }

  addItem = (name, item) => {
    let newObj = {}
    APIManager.post(name, item)
      .then(() =>
        APIManager.getAll(
          `${name}?user_id=${+sessionStorage.getItem("activeUser")}`
        )
      )
      .then(items => {
        newObj[name] = items
        this.setState(newObj)
      })
      .then(() => this.props.history.push("/"))
      .then(() => this.props.history.push(`/${name}`))
  }
  addMessage = (name, item) => {
    let newObj = {}
    APIManager.post(name, item)
      .then(() =>
        APIManager.getAll(
          `${name}`
        )
      )
      .then(items => {
        newObj[name] = items
        this.setState(newObj)
      })
      .then(() => this.props.history.push(`/${name}`))
  }

  //loading user data to update state object
  componentDidMount() {
    const newState = {}
    APIManager.getAll("users")
      .then(allUsers => (newState.users = allUsers))
      .then(() => APIManager.getAll("friends"))
      .then(allFriends => (newState.friends = allFriends))
      .then(() =>
        APIManager.getAll("locations"))
      .then(allLocations => (newState.locations = allLocations))
      .then(() => this.setState(newState))
  }

  // check session storage for value, return true or false
  isAuthenticated = () => {
    return sessionStorage.getItem("activeUser") !== null
  }

  render() {

    //route to all views
    //if "isAuthenticated" returns true, then routes are accessible to users
    //otherwise, route to welcome page

    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) return <div>welcome to prime time</div>
            else return <Redirect to="/welcome" />
          }}
        />

        <Route
          exact
          path="/welcome"
          render={props => {
            // Render a default page if user is not signed in
            return <Welcome {...props}/>
          }}
        />

        <Route
          exact
          path="/login"
          render={props => {
            return <Login setUser={this.props.setUser} {...props} />
          }}
        />

        <Route
          exact
          path="/register"
          render={props => {
            return <Register users={this.state.users} setUser={this.props.setUser} {...props} />
          }}
        />

        <Route
          exact
          path="/triangulate"
          render={props => {
            return <MapPage users={this.state.users} locations={this.state.locations} friends={this.state.friends} {...props} />
          }}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(ApplicationViews)

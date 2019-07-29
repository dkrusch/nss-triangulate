import React, { Component } from "react"
import { Map, GoogleApiWrapper } from 'google-maps-react';
// import NavBar from "./nav/NavBar"
// import ApplicationViews from "./ApplicationViews"
// import "./Map.css"

class MapPage extends Component {


    render() {
        console.log("what is key", process.env.REACT_APP_GOOGLE_MAP_KEY)
        return (
            <Map
              google={this.props.google}
              zoom={8}
              initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        );
      }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
  })(MapPage);

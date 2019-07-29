import React, { Component } from "react"
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import NavBar from "./nav/NavBar"
// import ApplicationViews from "./ApplicationViews"
import "./Map.css"

class MapPage extends Component {
    state = {
        coordinates: [{lat: 47.49855629475769, lng: -122.14184416996333},
                {latitude: 47.359423, longitude: -122.021071},
                {latitude: 47.2052192687988, longitude: -121.988426208496},
                {latitude: 47.6307081, longitude: -122.1434325},
                {latitude: 47.3084488, longitude: -122.2140121},
                {latitude: 47.5524695, longitude: -122.0425407}]
      }

    displayMarkers = () => {
      return this.state.coordinates.map((coordinate, index) => {
        return <Marker key={index} id={index} position={{
         lat: coordinate.latitude,
         lng: coordinate.longitude
       }}
       onClick={() => console.log("You clicked me!")} />
      })
    }

      render() {
        const mapStyles = {
            width: '75%',
            height: '100%',
          };

        return (
            <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 47.444, lng: -122.176}}
            >
              {this.displayMarkers()}
            </Map>
        );
      }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
  })(MapPage);

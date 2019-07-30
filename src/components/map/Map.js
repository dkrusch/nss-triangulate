import React, { Component } from "react"
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import NavBar from "./nav/NavBar"
// import ApplicationViews from "./ApplicationViews"
import MapForm from "./MapForm"
import "./Map.css"

class MapPage extends Component {
    state = {
        coordinates: [{latitude: 47.49855629475769, longitude: -122.14184416996333}]
      }

    displayMarkers = () => {
      console.log(this.state)
      return this.state.coordinates.map((coordinate, index) => {
        return <Marker key={index} id={index} position={{
         lat: coordinate.latitude,
         lng: coordinate.longitude
       }}
       onClick={() => console.log("You clicked me!")} />
      })
    }

    addLocation = (latlong) => {
        console.log(latlong)
        this.setState(previousState =>
            {
                console.log("hello", previousState)
                return {coordinates: previousState.coordinates.concat(latlong)}
            })
    }

    render() {
        const mapStyles = {
            width: '100%',
            height: '60%',
          }

        console.log("what is key", process.env.REACT_APP_GOOGLE_MAP_KEY)
        return (
            <React.Fragment>
                <div className="MapContainer">
                <MapForm addLocation={this.addLocation}/>
                <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176}}
                >
                {this.displayMarkers()}
                </Map>
                </div>
            </React.Fragment>
        );
      }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
  })(MapPage);

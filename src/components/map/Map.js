import React, { Component } from "react"
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
// import NavBar from "./nav/NavBar"
// import ApplicationViews from "./ApplicationViews"
import MapForm from "./MapForm"
import * as math from 'mathjs'
import "./Map.css"

class MapPage extends Component {
    state = {
        coordinates: [{latitude: 47.49855629475769, longitude: -122.14184416996333}],
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        center: {lat: 47.444, lng: -122.176},          //Shows the active marker upon click
        selectedPlace: {},
        bounds: {}
      }

    degrees = (radians) =>
    {
        let pi = Math.PI;
        return radians * (180/pi);
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

    displayCenterMarker = () => {
        console.log(this.state.center)
          return <Marker key={"center"} id={"center-mark"} position={{
           lat: this.state.center.lat,
           lng: this.state.center.lng
         }}
         onClick={() => console.log("You clicked me!")} />
      }

    addLocation = (latlong) => {
        console.log("latlong", latlong)
        console.log("state", this.state.coordinates)
        let newCoords = [...this.state.coordinates]
        console.log("updated", newCoords)
        this.setState({coordinates: newCoords.concat(latlong)})
    }

    // getLocation = () =>
    // {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(function(position) {
    //           var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //           };
    //           map.setCenter(pos);
    //         }, function() {
    //           handleLocationError(true, infoWindow, map.getCenter());
    //         });
    //       } else {
    //         // Browser doesn't support Geolocation
    //         handleLocationError(false, infoWindow, map.getCenter());
    //       }
    // }

    calculateCenter = () => {

        // Calls parseInputs

        // Function for finding the middle point found here: http://stackoverflow.com/questions/6671183/calculate-the-center-point-of-multiple-latitude-longitude-coordinate-pairs
        // Creates letiables to hold the sum of lat and lng
        let x = 0;
        let y = 0;
        let z = 0;

        // Loops over personLocations and finds the some of all the points
        for (let i = 0; i < this.state.coordinates.length; i++)
        {
            x += (math.cos(this.state.coordinates[i].latitude) * math.cos(this.state.coordinates[i].longitude));
            y += (math.cos(this.state.coordinates[i].latitude) * math.sin(this.state.coordinates[i].longitude));
            z += math.sin(this.state.coordinates[i].latitude);
        }

        // Returns the sums divided by length go get the average
        x = x / this.state.coordinates.length;
        y = y / this.state.coordinates.length;
        z = z / this.state.coordinates.length;

        // Converts the average back into lat and lng points
        // Returns the arc tangent of y / x in degrees
        let lng = this.degrees(math.atan2(y, x));
        // Finds the hypotenuse
        let hyp = math.sqrt(x * x + y * y);
        // Returns the arc tangent of z / hyp in degrees
        let lat = this.degrees(math.atan2(z, hyp));
        let centerLatLng = {lat: lat, lng: lng};
        this.setState({center: {centerLatLng}})
        // let marker = new google.maps.Marker(
        // {
        //     position: centerLatLng,
        //     map: map,
        //     title: 'Marker',
        //     icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        // });
        // gmarkers.push(marker);
    }

    render() {
        const mapStyles = {
            width: '100%',
            height: '66.4%',
          }

        console.log("what is key", process.env.REACT_APP_GOOGLE_MAP_KEY)
        return (
            <React.Fragment>
                <div className="MapContainer">
                <MapForm addLocation={this.addLocation} calculateCenter={this.calculateCenter}/>
                <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={this.state.center}
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

import React, { Component } from "react"
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import MapForm from "./MapForm"
import * as math from 'mathjs'
import "./Map.css"
import { thisTypeAnnotation } from "@babel/types";

class MapPage extends Component {
    state = {
        coordinates: [],
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        center: {lat: 36.1627, lng: -86.7816},          //Shows the active marker upon click
        selectedPlace: {},
        bounds: {}
      }

    checkCenter = (mapStyle, mapStyles, bounds) => {
      if (this.state.coordinates.length === 0)
      {
        console.log("DONT BE IN HERE IT IS BAD TO BE IN HERE")
        const center = {lat: 36.1627, lng: -86.7816}
        return <Map
        initialCenter={center}
        streetViewControl={false}
        mapTypeControl={false}
        bounds={this.state.bounds}
        google={this.props.google}
        zoom={8}
        style={mapStyle}
        styles={mapStyles}
        >
        {this.displayMarkers()}
        </Map>
      }
      else if (this.state.coordinates.length === 1)
      {
        console.log("the coordniate", this.state.coordinates)
        console.log("the center", this.state.center)
        return <Map
        bounds={this.state.bounds}
        streetViewControl={false}
        google={this.props.google}
        zoom={8}
        style={mapStyle}
        styles={mapStyles}
        center={this.state.center}
        >
        {this.displayMarkers()}
        </Map>
      }
      else
      {
        console.log(this.state.bounds)
        return <Map
        bounds={this.state.bounds}
        streetViewControl={false}
        google={this.props.google}
        zoom={8}
        style={mapStyle}
        styles={mapStyles}
        >
        {this.displayMarkers()}
        </Map>
      }
    }

    degrees = (radians) =>
    {
        console.log(radians)
        let pi = Math.PI;
        console.log(pi)
        return radians * (180/pi);
    }

    displayMarkers = () => {
      console.log(this.state)
      return this.state.coordinates.map((coordinate, index) =>
      {
        if (coordinate.style === "normal")
        {
            return <Marker key={index} id={index} position={{
             lat: coordinate.latitude,
             lng: coordinate.longitude
           }}
           onClick={() => console.log("You clicked me!")} />
        }
        else
        {
            return <Marker key={index} id={index} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" position={{
                lat: coordinate.latitude,
                lng: coordinate.longitude
              }}
              onClick={() => console.log("You clicked me!")} />
        }
      })
    }

    clearMarkers = () => {
      const coords = [...this.state.coordinates]
      let lastIndex = coords.length - 1
      console.log("coords", coords)
      console.log("inde", lastIndex)
      if (coords !== [] && coords[lastIndex].style === "normal")
      {
          console.log(coords[lastIndex])
          coords.pop()
          this.setState({coordinates: coords})
      }
      else
      {
        coords.pop()
        coords.pop()
        this.setState({coordinates: coords})
      }
    }

    clearAllMarkers = () => {
        this.setState({coordinates: []})
    }

    clearAllMarkersSubmit = (submit, location) => {
        this.setState({coordinates: []}, () => this.addLocation(location))
    }

    addLocation = (latlong) => {
        console.log("latlong", latlong)
        console.log("state", this.state.coordinates)
        let coordLength = this.state.coordinates.length
        let newCoords = [...this.state.coordinates]
        console.log("updated", newCoords)
        if (coordLength === 0)
        {
          let newCenter = newCoords.concat(latlong)
          const center = {lat: newCenter[0].latitude, lng: newCenter[0].longitude}
          this.setState({center: center, coordinates: newCenter})
        }
        else
        {
          const bounds = new window.google.maps.LatLngBounds()
          let newerCoords = newCoords.concat(latlong)
          console.log("HELLO", newerCoords)
          const existent = this.state.coordinates.find(coordinate => (coordinate.latitude === latlong.latitude && coordinate.longitude === latlong.longitude))
          console.log("does it exist", existent)
          if (!existent)
          {
            newerCoords.forEach(coordinate => {
              console.log("bound loop", coordinate)
              console.log("bounds?", bounds)
              const latitude = coordinate.latitude
              const longitude = coordinate.longitude
              const latLng = new window.google.maps.LatLng(latitude, longitude);
              bounds.extend(latLng);
            })
            this.setState({bounds: bounds}, () => this.setState({coordinates: newCoords.concat(latlong)}))
          }
        }
    }

    calculateCenter = () => {

        // Calls parseInputs

        // Function for finding the middle point found here: http://stackoverflow.com/questions/6671183/calculate-the-center-point-of-multiple-latitude-longitude-coordinate-pairs
        // Creates letiables to hold the sum of lat and lng
        let x = 0;
        let y = 0;
        let z = 0;

        // Loops over locations and finds the some of all the points
        for (let i = 0; i < this.state.coordinates.length; i++)
        {
            // Convert the coordinate to degrees?
            let latitude = this.state.coordinates[i].latitude * Math.PI / 180;
            let longitude = this.state.coordinates[i].longitude * Math.PI / 180;

            x += (math.cos(latitude) * math.cos(longitude));
            y += (math.cos(latitude) * math.sin(longitude));
            z += math.sin(latitude);
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
        let centerLatLng = {latitude: lat, longitude: lng, style: "center"};
        // change this so it goes inc coordinates instead with a style attribute
        let newCoords = [...this.state.coordinates]
        this.setState({coordinates: newCoords.concat(centerLatLng)})
    }

    render() {
        const mapStyle = {
            width: '100%',
            height: '100%',
          }

        const mapStyles = [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#efac8b"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "weight": 1.5
              }
            ]
          },
          {
            "featureType": "administrative.neighborhood",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#ea8651"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#c1c1c1"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f4f4f4"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]

        return (
            <React.Fragment>
                <section>
                  <div className="submit-group">
                    <div className="MapContainer">
                      {this.checkCenter(mapStyle, mapStyles)}
                    </div>
                  </div>
                    <MapForm addLocation={this.addLocation} clearMarkers={this.clearMarkers} clearAllMarkers={this.clearAllMarkers} clearAllMarkersSubmit={this.clearAllMarkersSubmit} setFriend={this.props.setFriend} getFriendLocations={this.props.getFriendLocations} friendLocations={this.props.friendLocations} userLocations={this.props.userLocations} userFriends={this.props.userFriends} locations={this.props.locations} calculateCenter={this.calculateCenter} coordinates={this.state.coordinates}/>
                </section>
            </React.Fragment>
        );
      }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
  })(MapPage);

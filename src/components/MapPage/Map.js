import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { basicStyle } from './styles'
import centerMapToLocation from './utils/centerMapToLocation'
import { iconURLS } from './constants'

export class MapContainer extends Component {

    state = {
        hasCenterMoved: false, //used to center only once then give user control
    };

    onBoundsChanged = () => {

      if(!this.state.hasCenterMoved)
      {
        this.setState({...this.state,hasCenterMoved:true});
      }
      // for debuging use bounds change to check state
      // console.log(this.props.markerInfo.pointsOfInterest1);
    }

    onReady = (mapProps,map) => {
      const {google} = mapProps;
      this.props.setGoogleReferences(mapProps,map);
      if(!this.state.hasCenterMoved)
      {
        centerMapToLocation(map)
      }
      //const  service = new google.maps.places.PlacesService(map);
    }
  
    render() {
      return (
          <Map
            google={this.props.google}
            zoom={15}
            style={basicStyle}
            initialCenter={{ lat: 47.444, lng: -122.176}}
            clickableIcons={true}
            onReady={this.onReady}
            onDragend={this.onBoundsChanged}
          >
            {this.props.markerInfo.pointsOfInterest1.map(poi => {
              return <Marker
                name={poi.name}
                title={poi.name}
                position={poi.geometry.location}
                icon={{url: iconURLS.redIcon}}
                ></Marker>
            })}
            {this.props.markerInfo.pointsOfInterest2.map(poi => {
              return <Marker
                name={poi.name}
                title={poi.name}
                position={poi.geometry.location}
                icon={{url: iconURLS.blueIcon}}
              ></Marker>
            })}
          </Map>
      );
    }
  }

  export default GoogleApiWrapper( props => ({
    apiKey: props.googleMapKey,
  }))(MapContainer);
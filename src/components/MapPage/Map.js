import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { basicStyle } from './styles'
import centerMapToLocation from './utils/centerMapToLocation'

export class MapContainer extends Component {

    state = {
        hasCenterMoved: false, //used to center only once then give user control
    };

    onBoundsChanged = () => {

      if(!this.state.hasCenterMoved)
      {
        this.setState({...this.state,hasCenterMoved:true});
      }
    
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
          <Marker position={{ lat: 48.00, lng: -122.00}} />
          </Map>
      );
    }
  }

  export default GoogleApiWrapper( props => ({
    apiKey: props.googleMapKey,
  }))(MapContainer);
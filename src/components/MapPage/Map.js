import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { basicStyle } from './styles'
import centerMapToLocation from './utils/centerMapToLocation'
import { iconURLS } from './constants'
import infoWindowString from './infoWindowString'

export class MapContainer extends Component {

    state = {
        hasCenterMoved: false, //used to center only once then give user control
        map: null,
        maps: null,
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
      this.setState({map: map, maps: mapProps});

    }

    onMarkerClick = (props, marker, e) => {
      let placeId = marker.name;
      let poi1 = this.props.markerInfo.pointsOfInterest1.find(poi => poi.place_id == placeId);
      let poi2 = this.props.markerInfo.pointsOfInterest2.find(poi => poi.place_id == placeId);
      let poi = poi1? poi1 : poi2;
      const contentString = infoWindowString(poi);
  
    const infowindow = new window.google.maps.InfoWindow({
      content: contentString,
    });
    infowindow.open(this.state.map,marker);
    
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
                title={poi.name}
                name={poi.place_id}
                position={poi.geometry.location}
                icon={{url: iconURLS.redIcon}}
                onClick={(props, marker, e) => this.onMarkerClick(props, marker, e)}
                ></Marker>
            })}
            {this.props.markerInfo.pointsOfInterest2.map(poi => {
              return <Marker
                title={poi.name}
                name={poi.place_id}
                position={poi.geometry.location}
                icon={{url: iconURLS.blueIcon}}
                onClick={(props, marker, e) => this.onMarkerClick(props, marker, e)}
            ></Marker>
            })}
          </Map>
      );
    }
  }

  export default GoogleApiWrapper( props => ({
    apiKey: props.googleMapKey,
  }))(MapContainer);
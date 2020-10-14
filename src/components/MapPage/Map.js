import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { basicStyle } from './styles'
import centerMapToLocation from './utils/centerMapToLocation'
import populateMarkers from './utils/populateMarkers';
import clearMarkers from './utils/clearMarkers'
import addMarkerEventHandlers from './utils/addMarkerEventHandlers'

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCenterMoved: false, //used to center only once then give user control
      map: null,
      maps: null,
      detailService: null,
      markerMap: {},
    };
  }
  

  onBoundsChanged = () => {

    if (!this.state.hasCenterMoved) {
      this.setState({ ...this.state, hasCenterMoved: true });
    }
    // for debuging use bounds change to check state
    // console.log(this.state);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.markerInfo !== this.props.markerInfo) {
      clearMarkers(prevState.markerMap);
      clearMarkers(this.state.markerMap);
      let markerMapping = populateMarkers(this.state.map,this.props.markerInfo.pointsOfInterest1,this.props.markerInfo.pointsOfInterest2);  
      await addMarkerEventHandlers(this.state.map,markerMapping,this.props.markerInfo,this.state.detailService);
      if(markerMapping) {
        this.setState({markerMap: markerMapping});
      }
    }
  }

  componentWillUnmount() {
    clearMarkers(this.state.markerMap);
  }

  onReady = (mapProps, map) => {
    const { google } = mapProps;
    this.props.setGoogleReferences(mapProps, map);
    if (!this.state.hasCenterMoved) {
      centerMapToLocation(map)
    }
    let service = new window.google.maps.places.PlacesService(map);
    this.setState({map: map, maps: mapProps, detailService: service });
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={basicStyle}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
        clickableIcons={true}
        onReady={this.onReady}
        onDragend={this.onBoundsChanged}
      >
      </Map>
    );
  }
}

export default GoogleApiWrapper(props => ({
  apiKey: props.googleMapKey,
}))(MapContainer);
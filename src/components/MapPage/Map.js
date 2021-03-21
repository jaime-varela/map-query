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
    // Add any debug code here
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.markerInfo !== this.props.markerInfo) {
      clearMarkers(prevState.markerMap);
      clearMarkers(this.state.markerMap);
      let markerMaps = populateMarkers(this.state.map,this.props.markerInfo.markerPoiArrays);  
      let adjacencyList = (this.props.markerInfo)? this.props.markerInfo.adjacencyList : {};
      await addMarkerEventHandlers(this.state.map,markerMaps.makerMap,markerMaps.poiMap,adjacencyList,this.state.detailService);
      if(markerMaps.makerMap) {
        this.setState({markerMap: markerMaps.makerMap});
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
    // runtime media query
    const isDesktopOrLaptop = window.matchMedia("(min-width: 1224px)").matches;
    if(!isDesktopOrLaptop) {
      map.setOptions({gestureHandling: 'greedy'});
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
        initialCenter={{ lat: 42.355, lng: -71.064 }}
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
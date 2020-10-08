import React, { Component, useImperativeHandle } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { basicStyle } from './styles'
import centerMapToLocation from './utils/centerMapToLocation'
import { iconURLS } from './constants'
import infoWindowString from './infoWindowString'
import handleInfoWindowEvents from './handleInfoWindowEvents'

export class MapContainer extends Component {

  constructor(props) {
      super(props);
      this.state = {
        hasCenterMoved: false, //used to center only once then give user control
        map: null,
        maps: null,
        visibleInfoWindows: {},
        detailService: null
      };
    }


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
      let service = new window.google.maps.places.PlacesService(map);
      this.setState({map: map, maps: mapProps,detailService: service});

    }

    onMarkerClick = async (props, marker, e) => {
      let placeId = marker.name;
      if(this.state.visibleInfoWindows[placeId] && this.state.visibleInfoWindows[placeId].getMap())
      {
          return;
      }
      let poi1 = this.props.markerInfo.pointsOfInterest1.find(poi => poi.place_id == placeId);
      let poi2 = this.props.markerInfo.pointsOfInterest2.find(poi => poi.place_id == placeId);
      let poi = poi1? poi1 : poi2;
      const contentString = await infoWindowString(poi,this.state.detailService);
  
    const infowindow = new window.google.maps.InfoWindow({
      content: contentString,
    });
    this.state.visibleInfoWindows[placeId] = infowindow;
    infowindow.open(this.state.map,marker);
    /*
      Event handlers of info window childs must be handled only when they are domready.
    */
    window.google.maps.event.addListener(infowindow, "domready", () => {
      handleInfoWindowEvents(placeId);
    });

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
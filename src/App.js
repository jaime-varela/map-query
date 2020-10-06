import React, { Component } from 'react';
import Map from './components/MapPage/Map'
import Sidebar from './components/SidePanel/Sidebar'
import QueryForm from './components/QueryForm/QueryForm'
import secrets from './secrets'
import { cases } from "./constants"
import { formIDS } from './components/QueryForm/queryConstants'
import { placeQuery } from './utils/placesQuery'
import computeRadiusFromMap from './utils/computeRadiusFromMap';


const gMapsKey = secrets.googleMapApiKey;

class App extends Component {
  constructor(props) {
    super(props)
    this.updatePointsOfInterestQuery = this.updatePointsOfInterestQuery.bind(this); 
    this.setGoogleReferences = this.setGoogleReferences.bind(this);  
  }
  // callback to update google references when map loads, I really should manage state better
  setGoogleReferences = (maps,map) => {
    this.setState({...this.state,maps:maps,map:map});
  }
  // local state for now
  // might use redux later
  state = {
    pointsOfInterest1: [],
    pointsOfInterest2: [],
    distanceSpecification: 0,
    distanceCase: cases.MINUTES_WALKING,
    radius: 0.0,
    // maps refs
    map: null,
    maps: null,
  };
  
  updatePointsOfInterestQuery = async () => {    

    const poi1Element = document.getElementById(formIDS.poi1);
    const poi2Element = document.getElementById(formIDS.poi2);
    const distanceNumElement = document.getElementById(formIDS.distanceNumber);
    const distanceCaseElement = document.getElementById(formIDS.distanceCase);

    // Google maps displays results outside of the range so this factor is used to tune
    const compensatingFactor = 0.5;
    const radius = compensatingFactor * computeRadiusFromMap(this.state.map);
    const center = this.state.map.getCenter();

    const POI1 = await placeQuery(this.state.maps,this.state.map,poi1Element.value,radius,center);
    const POI2 = await placeQuery(this.state.maps,this.state.map,poi2Element.value,radius,center);
    //remember you're sending this state to the map
    this.setState({...this.state,
      pointsOfInterest1:POI1,
      pointsOfInterest2:POI2,
      distanceSpecification: distanceNumElement? Number(distanceNumElement.value) : 0.0,
      distanceCase: distanceCaseElement? Number(distanceCaseElement.value) : cases.MINUTES_WALKING,
    });
  };
  render() {
    return (
      <div className="viewport">
        <div className="sideBarContainer">
          <Sidebar width={400} height={"100vh"}>
            <QueryForm 
            updatePointsOfInterestQuery={this.updatePointsOfInterestQuery}
            googleRef = {this.state.maps}
            googleMap = {this.state.map}>
            </QueryForm>
        </Sidebar>
        </div>
        <div className="static-pane">
          <Map 
          googleMapKey={gMapsKey}
          setGoogleReferences={this.setGoogleReferences}
          markerInfo={{
            pointsOfInterest1:this.state.pointsOfInterest1,
            pointsOfInterest2:this.state.pointsOfInterest2,
            distanceSpecification: this.state.distanceSpecification,
            distanceCase:this.state.distanceCase,
          }}
          ></Map>
        </div>
      </div>
    );  
  }
}

export default App;

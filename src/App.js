import React, { Component } from 'react';
import Map from './components/MapPage/Map'
import Sidebar from './components/SidePanel/Sidebar'
import QueryForm from './components/QueryForm/QueryForm'
import secrets from './secrets'
import { cases } from "./constants"
import { formIDS } from './components/QueryForm/queryConstants'
import { placeQuery } from './utils/placesQuery'

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
    // console.log(this.state);
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
    const data = await placeQuery(this.state.maps,this.state.map,poi1Element.value,30,{lat: 42.3514341, lon: -71.075554 });
    console.log(data);


    //remember you're sending this state to the map
    // this.setState({...this.state,
    //   pointsOfInterest1:poi1,
    //   pointsOfInterest2:poi2,
    //   distanceSpecification: dist,
    //   distanceCase:myCase
    // });
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
          ></Map>
        </div>
      </div>
    );  
  }
}

export default App;

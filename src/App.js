import React, { Component } from 'react';
import Map from './components/MapPage/Map'
import Sidebar from './components/SidePanel/Sidebar'
import QueryForm from './components/QueryForm/QueryForm'
import secrets from './secrets'
import { cases } from "./constants"
const gMapsKey = secrets.googleMapApiKey;

class App extends Component {
  constructor(props) {
    super(props)
    this.updatePointsOfInterestQuery = this.updatePointsOfInterestQuery.bind(this); 
    this.setGoogleReferences = this.setGoogleReferences.bind(this);  
    this.globalMap = null;
    this.googleRef = null; 
  }
  // callback to update google references when map loads, I really should manage state better
  setGoogleReferences = (maps,map) => {
    console.log(map);
    this.globalMap = map;
    this.googleRef = maps;
  }
  // local state for now
  // might use redux later
  state = {
    pointsOfInterest1: [],
    pointsOfInterest2: [],
    distanceSpecification: 0,
    distanceCase: cases.MINUTES_WALKING,
    radius: 0.0,
  };
  
  updatePointsOfInterestQuery = (poi1,poi2,dist,myCase) => {    
    //remember you're sending this state to the map
    this.setState({...this.state,
      pointsOfInterest1:poi1,
      pointsOfInterest2:poi2,
      distanceSpecification: dist,
      distanceCase:myCase
    });
  };
  render() {
    return (
      <div className="viewport">
        <div className="sideBarContainer">
          <Sidebar width={400} height={"100vh"}>
            <QueryForm 
            updatePointsOfInterestQuery={this.updatePointsOfInterestQuery}>
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

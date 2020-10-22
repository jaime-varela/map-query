import React, { Component } from 'react';
import Map from './components/MapPage/Map'
import Sidebar from './components/SidePanel/Sidebar'
import QueryForm from './components/QueryForm/QueryForm'
import MoveTo from './components/MoveTo/MoveTo'
import { cases, resourceURLS } from "./constants"
import { formIDS } from './components/QueryForm/queryConstants'
import { moveToForm } from './components/MoveTo/constants'
import { placeQuery } from './utils/placesQuery'
import computeRadiusFromMap from './utils/computeRadiusFromMap';
import filterLocationByProximity from './utils/filterLocationByProximity'
import MediaQuery from 'react-responsive'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

const gMapsKey = "AIzaSyBPLt1VwIxDl8r2YbDCx_ND_l7mebTzRtM";

class App extends Component {
  constructor(props) {
    super(props)
    this.updatePointsOfInterestQuery = this.updatePointsOfInterestQuery.bind(this); 
    this.setGoogleReferences = this.setGoogleReferences.bind(this);  
    this.reCenterMapFromQuery = this.reCenterMapFromQuery.bind(this);
    this.recenterMap = this.recenterMap.bind(this);
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
    displayPOI1: [],
    displayPOI2: [],
    adjacencyList: {},
    // country data
    isCountryDataLoaded: false,
    countryData: [],
  };
  
  async componentDidMount() {
    fetch(resourceURLS.countryCityData, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((result) => {
      this.setState({isCountryDataLoaded: true,countryData: result});
    });      

  }

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

    let filteredPoints = {filteredPOI1: POI1,filteredPOI2:POI2};
    if(distanceCaseElement && distanceNumElement)
    {
      filteredPoints = filterLocationByProximity(POI1,POI2,distanceNumElement.value,distanceCaseElement.value);
    }
    //remember you're sending this state to the map
    this.setState({...this.state,
      pointsOfInterest1:POI1,
      pointsOfInterest2:POI2,
      distanceSpecification: distanceNumElement? Number(distanceNumElement.value) : 0.0,
      distanceCase: distanceCaseElement? Number(distanceCaseElement.value) : cases.MINUTES_WALKING,
      displayPOI1: filteredPoints.filteredPOI1,
      displayPOI2: filteredPoints.filteredPOI2,
      adjacencyList: filteredPoints.adjacencyList,
    });
  };

  reCenterMapFromQuery = async () => {
    const moveQuery = document.getElementById(moveToForm.moveToQuery);
    if(moveQuery == null) {return;}
    const queryText = moveQuery.value;
    if(queryText == "" || queryText == null) {return;}
    let request = {
      query: queryText,
      fields: ['name', 'geometry'],
    };
  
    let service = new window.google.maps.places.PlacesService(this.state.map);
  
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        // First result assigned to center
        this.state.map.setCenter(results[0].geometry.location);
      }
    });
  }

  recenterMap = geometry => {
    this.state.map.setCenter(geometry);
  }

  render() {
    return (
      <div className="viewport">
        <MediaQuery maxDeviceWidth={1224}>
        <div className="sideBarContainerMobile">
          <Sidebar width={250} height={"100vh"}>
          <Tabs defaultActiveKey="query" id="uncontrolled-tab-example">
              <Tab eventKey="query" title="Query">
                <QueryForm 
                updatePointsOfInterestQuery={this.updatePointsOfInterestQuery}
                googleRef = {this.state.maps}
                googleMap = {this.state.map}>
                </QueryForm>
              </Tab>
              <Tab eventKey="moveTo" title="Move To">
                <MoveTo
                reCenterMapFromQuery={this.reCenterMapFromQuery}
                recenterMap={this.recenterMap}
                countryData={this.state.countryData}
                isCountryDataLoaded={this.state.isCountryDataLoaded}
                ></MoveTo>
              </Tab>
          </Tabs>
          </Sidebar>
        </div>
        <div className="static-pane-mobile">
          <Map 
          googleMapKey={gMapsKey}
          setGoogleReferences={this.setGoogleReferences}
          markerInfo={{
            pointsOfInterest1:this.state.displayPOI1,
            pointsOfInterest2:this.state.displayPOI2,
            distanceSpecification: this.state.distanceSpecification,
            distanceCase:this.state.distanceCase,
          }}
          ></Map>  
          </div>      
        </MediaQuery>
        <MediaQuery minDeviceWidth={1224}>
        <div className="sideBarContainer">
          <Sidebar width={400} height={"100vh"}>
          <Tabs defaultActiveKey="query" id="uncontrolled-tab-example">
              <Tab eventKey="query" title="Query">
                <QueryForm 
                updatePointsOfInterestQuery={this.updatePointsOfInterestQuery}
                googleRef = {this.state.maps}
                googleMap = {this.state.map}>
                </QueryForm>
              </Tab>
              <Tab eventKey="moveTo" title="Move To">
              <MoveTo
                reCenterMapFromQuery={this.reCenterMapFromQuery}
                recenterMap={this.recenterMap}
                countryData={this.state.countryData}
                isCountryDataLoaded={this.state.isCountryDataLoaded}
              ></MoveTo>
              </Tab>
          </Tabs>
          </Sidebar>
        </div>
        <div className="static-pane">
          <Map 
          googleMapKey={gMapsKey}
          setGoogleReferences={this.setGoogleReferences}
          markerInfo={{
            pointsOfInterest1:this.state.displayPOI1,
            pointsOfInterest2:this.state.displayPOI2,
            distanceSpecification: this.state.distanceSpecification,
            distanceCase:this.state.distanceCase,
            adjacencyList: this.state.adjacencyList,
          }}
          ></Map>
        </div>
        </MediaQuery>
      </div>
    );  
  }
}

export default App;

import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Spinner from 'react-bootstrap/Spinner'
import MediaQuery from 'react-responsive'
import { moveToForm } from './constants'

export class QueryForm extends Component {
    state = {
      loading: false,
      viewDistance: false,
      // country data
      stateData: [],
      cityData: [],
      selectedCity: null,
    }
    
    onSubmitQuery = async (event) => {
        event.preventDefault();
        this.setState({loading:true});
        await this.props.reCenterMapFromQuery();
        this.setState({loading:false});
        // runtime media query
        const isDesktopOrLaptop = window.matchMedia("(min-width: 1224px)").matches;
        // click the side bar button if on mobile (temp work around)
        if(!isDesktopOrLaptop) {
          document.getElementById("sideBarButtonClickID").click();
        }
      };

    onCitySelect = (event) => {
      if(this.state.selectedCity == null) {return;}
      let lat = Number(this.state.selectedCity.latitude);
      let lng = Number(this.state.selectedCity.longitude);
      if(lat== null || lng == null) {return;}
      let geometry = {
        lat: lat,
        lng: lng,
      };
      this.props.recenterMap(geometry);
    }

    setRegionSelectToDefault = () => {
      const regionSelect = document.getElementById(moveToForm.regionSelect);
      if(regionSelect == null) {return;}
      regionSelect.value = -1;//negative one is the default
    }
    setCitySelectToDefault = () => {
      const citySelect = document.getElementById(moveToForm.citySelect);
      if(citySelect == null) {return;}
      citySelect.value = -1;//negative one is the default
    }

    handleCountrySelect = (event) => {
      const countrySelect = document.getElementById(moveToForm.countrySelect);
      if(countrySelect == null) {return;}
      const countryID = countrySelect.value;
      if(countryID == "" || countryID == null || countryID < 0) {
        this.setState({stateData: [],cityData:[]});
        return;
      }
      let countryValue = this.props.countryData.find(country => country.id == countryID);
      this.setState({stateData: countryValue.states});
      this.setRegionSelectToDefault();
      this.setCitySelectToDefault();

    }
    handleRegionSelect = (event) => {
      const regionSelect = document.getElementById(moveToForm.regionSelect);
      if(regionSelect == null) {return;}
      const regionID = regionSelect.value;
      if(regionID == "" || regionID == null || regionID < 0) {
        this.setState({cityData:[]});
        return;
      }
      let stateSelected = this.state.stateData.find(region => region.id == regionID);
      this.setState({cityData: stateSelected.cities});
      this.setCitySelectToDefault();
    }
    handleCitySelect = (event) => {
      const citySelect = document.getElementById(moveToForm.citySelect);
      if(citySelect == null) {return;}
      const cityID = citySelect.value;
      if(cityID == "" || cityID == null || cityID < 0) {
        this.setState({selectedCity:null});
        return;
      }
      let citySelected = this.state.cityData.find(city => city.id == cityID);
      this.setState({selectedCity: citySelected});
    }


    render() {
        return (
            <div className="formContainer">
            <Form onSubmit={this.onSubmitQuery}>
              <Form.Group controlId="moveToQuery">
                <Form.Label>Find </Form.Label>
                <Row>
                  <Col xs={8}>
                    <Form.Control type="text" id={moveToForm.moveToQuery}/>
                  </Col>
                  <Col xs={1}>
                  {this.state.loading?
                  <Spinner animation="border" variant="primary" />
                  :<Button variant="primary" type="submit">Go</Button>
                  }
                </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="moveToCity">
                <Form.Label>Or specify a Country and City </Form.Label>
                  <Form.Control as="select" disabled={!this.props.isCountryDataLoaded} onChange={this.handleCountrySelect} id={moveToForm.countrySelect}>
                    <option value={-1}>{this.props.isCountryDataLoaded? "Country ...":"Getting Country data"}</option>
                {this.props.isCountryDataLoaded? this.props.countryData.map(country => {return <option value={country.id}>{country.name}</option>}) : <option value={-2}></option>}
                  </Form.Control>
                  <Form.Control as="select" disabled={!(this.state.stateData.length > 0)} onChange={this.handleRegionSelect} id={moveToForm.regionSelect}>
                    <option value={-1}>{this.props.isCountryDataLoaded? "Region ...":"Getting Region data"}</option>
                {(this.state.stateData.length > 0)? this.state.stateData.map(state => {return <option value={state.id}>{state.name}</option>}) : <option value={-2}></option>}
                  </Form.Control>
                  <Form.Control as="select" disabled={!(this.state.cityData.length > 0)} onChange={this.handleCitySelect} id={moveToForm.citySelect}>
                    <option value={-1}>{this.props.isCountryDataLoaded? "City ...":"Getting City data"}</option>
                {(this.state.cityData.length > 0)? this.state.cityData.map(city => {return <option value={city.id}>{city.name}</option>}) : <option value={-2}></option>}
                  </Form.Control>
              </Form.Group>
              <Button onClick={this.onCitySelect} variant="primary" disabled={!this.props.isCountryDataLoaded}>Go</Button>
              </Form>
            </div>
    );
    }
}

export default QueryForm;
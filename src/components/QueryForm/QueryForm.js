import React, { Component } from 'react';
import QueryText from './QueryText'
import DistanceFormText from './DistanceFormText'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { cases } from '../../constants'
import { placeHolder , formIDS, imageUrls } from './queryConstants'
import { iconURLArray } from '../MapPage/constants'
import Spinner from 'react-bootstrap/Spinner'
import MediaQuery from 'react-responsive'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const MAX_QUERY_POIS = 5;
const MIN_QUERY_POIS = 1;

export class QueryForm extends Component {
    state = {
      loading: false,
      viewDistance: false,
      numPOIs : 2,
      activeFormIds : [formIDS.poiIds[0],formIDS.poiIds[1]],
    }
    
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({...this.state,loading:true});
        await this.props.updatePointsOfInterestQuery(this.state.numPOIs);
        this.setState({...this.state,loading:false});
        // runtime media query
        const isDesktopOrLaptop = window.matchMedia("(min-width: 1224px)").matches;
        // click the side bar button if on mobile (temp work around)
        if(!isDesktopOrLaptop) {
          document.getElementById("sideBarButtonClickID").click();
        }

      };

    handleViewDistanceClick = () => {
      // toggle view distance
      this.setState({...this.state,viewDistance: !this.state.viewDistance});
    }
    updatePOIids = async (numPOIs) => {
      let result = [];
      for (let index = 0; index < numPOIs; index++) {
        result[index] = formIDS.poiIds[index];        
      }
      await this.setState({...this.state,activeFormIds: result});
    }

    handlePOIincrease = async () => {
      // toggle view distance
      let newPOInum = Math.min(MAX_QUERY_POIS,this.state.numPOIs+1);
      await this.setState({...this.state,numPOIs: newPOInum});
      this.updatePOIids(newPOInum);
    }
    handlePOIdecrease = async () => {
      // toggle view distance
      let newPOInum = Math.max(MIN_QUERY_POIS,this.state.numPOIs - 1);
      await this.setState({...this.state,numPOIs: newPOInum});
      await this.updatePOIids(newPOInum);
    }


    // --------------- Begin Tooltip renders ----------------------
    renderToggleDistanceTooltip = (props) => (
      <Tooltip id="toggleDistanceTooltip" {...props}>
        {this.state.viewDistance? "Ignore Distance":"Restrict by distance"}
      </Tooltip>
    );


    // ---------- Begin render -----------------
    render() {
        return (
            <div className="formContainer">
            <MediaQuery  minDeviceWidth={1224}>
              <QueryText></QueryText>              
            </MediaQuery>
            <Form onSubmit={this.onSubmit}>
              {
                this.state.activeFormIds.map((val,ind) => {
                  return (<Form.Group>
                  <Form.Label>{(ind == 0)? "Find" : "And"} </Form.Label>
                  <Row>
                    <Col xs={9}>
                      <Form.Control id={val} type="text" placeholder={placeHolder.poiPlaceHolders[ind]} />
                    </Col>
                    <Col xs={1}>
                      <Image src={iconURLArray[ind]} roundedCircle />
                    </Col>
                  </Row>
                </Form.Group>)
                })
              }
              <Form.Group>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 100 }}
                  overlay={this.renderToggleDistanceTooltip}
                >
                <Button onClick={this.handleViewDistanceClick} variant="light">
                  <Image src={this.state.viewDistance? imageUrls.distanceToggleUp: imageUrls.distanceToggleDown}  roundedCircle />
                </Button>
                </OverlayTrigger>
              </Form.Group>
              {(!this.state.viewDistance)?               
              <div></div>:<Form.Group controlId="formDistanceSpecification">
                <MediaQuery  minDeviceWidth={1224}>
                  <DistanceFormText></DistanceFormText>
                </MediaQuery>
                <Form.Label>Within</Form.Label>
                <Form.Control id={formIDS.distanceNumber} type="number" min={0}/>
                <Form.Control id={formIDS.distanceCase} as="select" disabled={true}>
                  <option value={cases.MINUTES_WALKING}>minutes walking</option>
                  <option value={cases.MINUTES_DRIVING}>minutes driving</option>
                </Form.Control>
              </Form.Group>}
              <Form.Group>
                <Row>
              <Col>
              {this.state.loading?
                <Spinner animation="border" variant="primary" />
                :<Button variant="primary" type="submit">Query</Button>
              }
              </Col>
              <Col>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary" onClick={this.handlePOIincrease}>+</Button>
                  <Button variant="secondary" onClick={this.handlePOIdecrease}>-</Button>
               </ButtonGroup>
              </Col>
              </Row>
              </Form.Group>
            </Form>
            </div>
    );
    }
}

export default QueryForm;
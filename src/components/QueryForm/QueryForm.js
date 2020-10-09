import React, { Component } from 'react';
import QueryText from './QueryText'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { cases } from '../../constants'
import { placeHolder , formIDS, imageUrls } from './queryConstants'
import { iconURLS } from '../MapPage/constants'
import Spinner from 'react-bootstrap/Spinner'

export class QueryForm extends Component {
    state = {
      loading: false,
      viewDistance: false
    }
    
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({...this.state,loading:true});
        await this.props.updatePointsOfInterestQuery();
        this.setState({...this.state,loading:false});
      };

    handleViewDistanceClick = () => {
      // toggle view distance
      this.setState({...this.state,viewDistance: !this.state.viewDistance});
    }
    // --------------- Begin Tooltip renders ----------------------
    renderToggleDistanceTooltip = (props) => (
      <Tooltip id="toggleDistanceTooltip" {...props}>
        {this.state.viewDistance? "Ignore Distance":"Restrict by distance"}
      </Tooltip>
    );

    render() {
        return (
            <div className="formContainer">
            <QueryText></QueryText>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formPointOfInterest1">
                <Form.Label>Find </Form.Label>
                <Row>
                  <Col>
                    <Form.Control id={formIDS.poi1} type="text" placeholder={placeHolder.poi1} />
                  </Col>
                  <Col sm={2}>
                    <Image src={iconURLS.redIcon} roundedCircle />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formPointOfInterest2">
                <Form.Label>And</Form.Label>
                <Row>
                  <Col>
                    <Form.Control id={formIDS.poi2} type="text" placeholder={placeHolder.poi2} />
                  </Col>
                  <Col sm={2}>
                    <Image src={iconURLS.blueIcon} roundedCircle />
                  </Col>
                </Row>
              </Form.Group>
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
                <Form.Label>Within</Form.Label>
                <Form.Control id={formIDS.distanceNumber} type="number" min={0}/>
                <Form.Control id={formIDS.distanceCase} as="select" disabled={true}>
                  <option value={cases.MINUTES_WALKING}>minutes walking</option>
                  <option value={cases.MINUTES_DRIVING}>minutes driving</option>
                </Form.Control>
              </Form.Group>}
              {this.state.loading?
                <Spinner animation="border" variant="primary" />
                :<Button variant="primary" type="submit">Query</Button>
              }
            </Form>
            </div>
    );
    }
}

export default QueryForm;
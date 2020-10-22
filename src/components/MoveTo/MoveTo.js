import React, { Component } from 'react';
import MoveToText from './MoveToText'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Spinner from 'react-bootstrap/Spinner'
import MediaQuery from 'react-responsive'
import { moveToForm } from './constants'

export class QueryForm extends Component {
    state = {
      loading: false,
      viewDistance: false
    }
    
    onSubmitQuery = async (event) => {
        event.preventDefault();
        this.setState({loading:true});
        await this.props.reCenterMap();
        this.setState({loading:false});
        // runtime media query
        const isDesktopOrLaptop = window.matchMedia("(min-width: 1224px)").matches;
        // click the side bar button if on mobile (temp work around)
        if(!isDesktopOrLaptop) {
          document.getElementById("sideBarButtonClickID").click();
        }

      };

    render() {
        return (
            <div className="formContainer">
            <MediaQuery  minDeviceWidth={1224}>
              <MoveToText></MoveToText>              
            </MediaQuery>
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
              </Form>
            </div>
    );
    }
}

export default QueryForm;
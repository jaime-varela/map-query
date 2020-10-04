import React, { Component } from 'react';
import QueryText from './QueryText'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { cases } from '../../constants'
import { placeHolder , formIDS } from './queryConstants'

export class QueryForm extends Component {

    
    onSubmit = async (event) => {
        event.preventDefault();
        await this.props.updatePointsOfInterestQuery();
    };

    render() {
        return (
            <div className="formContainer">
            <QueryText></QueryText>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formPointOfInterest1">
                <Form.Label>Find </Form.Label>
                <Form.Control id={formIDS.poi1} type="text" placeholder={placeHolder.poi1} />
              </Form.Group>

              <Form.Group controlId="formPointOfInterest2">
                <Form.Label>And</Form.Label>
                <Form.Control id={formIDS.poi2} type="text" placeholder={placeHolder.poi2} />
              </Form.Group>
              <Form.Group controlId="formDistanceSpecification">
                <Form.Label>Within</Form.Label>
                <Form.Control id={formIDS.distanceNumber} type="number" placeholder={1} />
                <Form.Control id={formIDS.distanceCase} as="select">
                  <option value={cases.MINUTES_WALKING}>minutes walking</option>
                  <option value={cases.MINUTES_DRIVING}>minutes driving</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                Query
              </Button>
            </Form>
            </div>
    );
    }
}

export default QueryForm;
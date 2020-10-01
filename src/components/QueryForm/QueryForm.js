import React, { Component } from 'react';
import QueryText from './QueryText'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export class QueryForm extends Component {
    
    onSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    };

    render() {
        return (
            <div className="formContainer">
            <QueryText></QueryText>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formPointOfInterest1">
                <Form.Label>Find </Form.Label>
                <Form.Control type="text" placeholder="bookstores" />
              </Form.Group>

              <Form.Group controlId="formPointOfInterest1">
                <Form.Label>And</Form.Label>
                <Form.Control type="text" placeholder="coffee shops" />
              </Form.Group>
              <Form.Group controlId="formDistanceSpecification">
                <Form.Label>Within</Form.Label>
                <Form.Control type="number" placeholder={1} />
                <Form.Control as="select">
                  <option value="minWalking">minutes walking</option>
                  <option value="minDriving">minutes driving</option>
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
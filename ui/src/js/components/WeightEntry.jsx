import React from "react";
import { Form } from "react-bootstrap";

function WeightEntry(props) {
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Text className="text-muted">
            Enter Your User ID to see your tracked weight
          </Form.Text>
          <br />
          <br />
          <Form.Label>Enter ID:</Form.Label>
          <Form.Control
            type="user_id"
            placeholder="Enter your User ID to see your metrics"
            onChange={props.onChange}
          />
          <br />
          <br />
          <br />
        </Form.Group>
      </Form>
    </div>
  );
}

export default WeightEntry;

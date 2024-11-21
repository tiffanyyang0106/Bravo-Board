import React from "react";
import { Card } from "react-bootstrap";

const Goal = ({ title, description }) => {
  return (
    <Card className="goal">
      <Card.Body>
        <h3>{title}</h3>
        <p>{description}</p>
      </Card.Body>
    </Card>
  );
};
export default Goal;

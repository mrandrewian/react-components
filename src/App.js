import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ClipText from "./components/ClipText/ClipText";
import AnimatedCounter from "./components/AnimatedCounter/AnimatedCounter";
import "./components/ClipText/ClipText.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col lg={6} className="clip-text-container pt-4">
              <Card bg="transparent">
                <Card.Header>Clip Text</Card.Header>
                <ClipText />
              </Card>
            </Col>
            <Col lg={6} className="animated-counter pt-4">
              <Card bg="dark">
                <Card.Header>Animated Counter</Card.Header>
                <AnimatedCounter />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

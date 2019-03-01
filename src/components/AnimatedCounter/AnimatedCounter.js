import React, { Component } from "react";
import { Card, ButtonGroup, Button } from "react-bootstrap";
import { numberToArray } from "../../utils/numberToArray";
import "./AnimatedCounter.scss";

class AnimatedCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawNumber: 0,
      numberArray: numberToArray(0),
      opacity: 0.1
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     opacity: 1
  //   });
  // }

  // componentDidUpdate() {
  //   this.setState({
  //     opacity: 0.1
  //   });
  // }

  plus = (number = 1) => {
    const newNumber = this.state.rawNumber + number;
    this.setState({
      rawNumber: newNumber,
      numberArray: numberToArray(newNumber)
    });
  };

  minus = (number = 1) => {
    const newNumber = this.state.rawNumber - number;
    this.setState({
      rawNumber: newNumber,
      numberArray: numberToArray(newNumber)
    });
  };

  render() {
    return (
      <Card.Body>
        <Card.Text className="text-center p-5">
          {this.state.numberArray.map(function(number, index) {
            return (
              <span style={{ opacity: 1 }} key={index}>
                {number}
              </span>
            );
          })}
        </Card.Text>
        <ButtonGroup className="w-100">
          <Button
            onClick={() => this.plus(10)}
            className="mx-2"
            variant="primary"
          >
            Plus
          </Button>
          <Button
            onClick={() => this.minus(10)}
            className="mx-2"
            variant="primary"
          >
            Minus
          </Button>
        </ButtonGroup>
      </Card.Body>
    );
  }
}

export default AnimatedCounter;

import React, { useState } from "react";
import { Card, ButtonGroup, Button } from "react-bootstrap";
import { numberToArray } from "../../utils/numberToArray";
import { useTrail, animated } from 'react-spring'
import "./AnimatedCounter.scss";

const config = { mass: 5, tension: 2000, friction: 200 }

const AnimatedCounter = () => {
  const [rawNumber, setRawNumber] = useState(0);
  const [numberArray, setNumberArray] = useState(numberToArray(0));
  const [toggle, setToggle] = useState(true)
  const trail = useTrail(numberArray.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  const plus = (currentRawNumber, number = 1) => {
    const newNumber = currentRawNumber + number;
    setRawNumber(newNumber);
    setNumberArray(numberToArray(newNumber));
  };
  
  const minus = (currentRawNumber, number = 1) => {
    const newNumber = currentRawNumber - number;
    setRawNumber(newNumber);
    setNumberArray(numberToArray(newNumber));
  };

  return (
    <Card.Body>
      <Card.Text className="text-center p-5">
        {/* {this.state.numberArray.map(function(number, index) {
          return (
            <animated.span key={index}>
              {number}
            </animated.span>
          );
        })} */}
        {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={numberArray[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
            <animated.span style={{ height }}>{numberArray[index]}</animated.span>
          </animated.div>
        ))}
      </Card.Text>
      <ButtonGroup className="w-100">
        <Button
          onClick={() => plus(rawNumber, 10)}
          className="mx-2"
          variant="primary"
        >
          Plus
        </Button>
        <Button
          onClick={() => minus(rawNumber, 10)}
          className="mx-2"
          variant="primary"
        >
          Minus
        </Button>
      </ButtonGroup>
    </Card.Body>
  );
}

export default AnimatedCounter;

import React, { useState } from "react";
import {
  Card,
  ButtonGroup,
  Button,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import { numberToArray } from "../../utils/numberToArray";
import { useTrail, animated } from "react-spring";
import useInterval from "../../utils/useInterval";
import "./AnimatedCounter.scss";

const config = { mass: 1, tension: 200, friction: 20 };

const AnimatedCounter = () => {
  let [delay, setDelay] = useState(1000),
    [isRunning, setIsRunning] = useState(true),
    [rawNumber, setRawNumber] = useState(0),
    [numberArray, setNumberArray] = useState(numberToArray(0));

  const trail = useTrail(numberArray.length, {
    config,
    from: { bottom: 100, opacity: 0 },
    to: { bottom: 0, opacity: 1 },
    reset: true
  });

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

  const updateDelay = value => {
    setDelay(value);
  };

  useInterval(
    () => {
      plus(rawNumber, 1);
    },
    isRunning ? delay : null
  );

  return (
    <Card.Body>
      <Card.Text className="text-center p-5">
        <div className="number-container">
          {trail.map(({ bottom, opacity }, index) => (
            <animated.span
              key={index}
              style={{
                bottom: bottom,
                opacity: opacity
              }}
            >
              {numberArray[index]}
            </animated.span>
          ))}
        </div>
      </Card.Text>
      <ButtonGroup className="w-100">
        <Button
          onClick={() => plus(rawNumber, 10)}
          className="mr-1"
          variant="primary"
        >
          Plus
        </Button>
        <Button
          onClick={() => minus(rawNumber, 10)}
          className="mr-1"
          variant="primary"
        >
          Minus
        </Button>
        <Button
          onClick={() => setIsRunning(isRunning ? false : true)}
          className="mr-1"
          variant="primary"
        >
          {isRunning ? (
            <React.Fragment>
              <span
                class="spinner-grow text-light spinner-grow-sm position-relative"
                role="status"
              />
              Stop Interval
            </React.Fragment>
          ) : (
            "Start Interval"
          )}
        </Button>
        <DropdownButton
          onSelect={eventKey => updateDelay(eventKey)}
          as={ButtonGroup}
          title="Interval Delay"
          id="bg-nested-dropdown"
        >
          <Dropdown.Item eventKey="1000">1/sec</Dropdown.Item>
          <Dropdown.Item eventKey="500">2/sec</Dropdown.Item>
          <Dropdown.Item eventKey="200">5/sec</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </Card.Body>
  );
};

export default AnimatedCounter;

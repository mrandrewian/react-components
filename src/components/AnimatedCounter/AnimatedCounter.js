import React, { useState, useEffect } from "react";
import { Card, ButtonGroup, Button } from "react-bootstrap";
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

  useInterval(
    () => {
      // Your custom logic here
      plus(rawNumber, 1);
    },
    isRunning ? delay : null
  );

  // useEffect(() => {
  //   const timer = window.setInterval(() => {
  //     plus(rawNumber, 1); // <-- Change this line!
  //   }, 1000);
  //   return () => {
  //     window.clearInterval(timer);
  //   };
  // });

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
          className=""
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
      </ButtonGroup>
    </Card.Body>
  );
};

export default AnimatedCounter;

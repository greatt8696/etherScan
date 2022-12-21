import { map } from "lodash";
import React, { useState } from "react";
import Gallery from "../../components/gallery/Gallery";

const Main = ({ msg, type }) => {
  const SIZE = 33;
  const DURATION = 1000;
  const stepTime = DURATION / SIZE;

  const arr = Array(SIZE)
    .fill(false)
    .map((_, idx) => stepTime * idx);

  return (
    <div className="grid grid-cols-3">
      {arr.map((delay, idx) => (
        <Gallery delay={delay} key={idx} idx={idx} />
      ))}
    </div>
  );
};

export default Main;

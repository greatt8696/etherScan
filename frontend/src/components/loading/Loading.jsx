import React, { useState } from "react";
import loading1 from "../../../public/images/loading1.gif";
import loading2 from "../../../public/images/loading2.gif";
import loading3 from "../../../public/images/loading3.gif";

const Loading = () => {
  const loadingTable = [loading1, loading2, loading3];
  const randomLoading = () =>
    loadingTable[parseInt(loadingTable.length * Math.random())];

  return (
    <div className="w-screen h-screen bg-black/50 backdrop-blur-md fixed flex z-50">
      <div className="mx-auto my-auto w-44 h-44 rounded-3xl bg-black/80  z-50 overflow-hidden">
        <img className="scale-110" src={randomLoading()} alt="" />
      </div>
    </div>
  );
};

export default Loading;

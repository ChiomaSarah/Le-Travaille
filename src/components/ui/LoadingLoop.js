import React from "react";
import Loader from "./Loader.gif";

const LoadingLoop = () => {
  return (
    <img
      src={Loader}
      style={{
        width: "200px",
        margin: "4rem auto",
        display: "block",
        background: "transparent",
      }}
      alt="Loading..."
    />
  );
};
export default LoadingLoop;

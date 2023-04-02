import React from "react";

const FaceRecognition = ({ onInputChange }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img src={onInputChange} width={'500px'} height={'auto'}></img>
      </div>
    </div>
  );
};

export default FaceRecognition;

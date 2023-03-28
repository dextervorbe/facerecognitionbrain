import React from "react";
import Tilt from "react-parallax-tilt";
import img from './icons8-head-with-brain-64.png';
import './Logo.css';

const Logo = () => {
  return (
    <div  className=" bg pt3 ma5 mt0" style={{ height: "150px", width: "150px"}}>
      <Tilt>
        <div >
          <img alt="Logo" className="logo" src={img}></img>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;

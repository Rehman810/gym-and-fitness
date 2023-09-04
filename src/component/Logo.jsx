import React, { Fragment } from "react";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <Fragment>
      <div className="back">
        <img
          style={{
            width: "8vw",
            height: "8vw",
            marginLeft: "10vw",
          }}
          src={logo}
          alt="logo"
        />
        <span className="logoText">Gym and Fitness</span>
      </div>
    </Fragment>
  );
};

export default Logo;

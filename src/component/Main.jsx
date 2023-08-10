import React, { Fragment } from "react";
import Logo from "./Logo";
import Form from "../Login";

const Login = () => {
  return (
    <Fragment>
      <div className="main">
        <Logo />
        <Form />
      </div>
    </Fragment>
  );
};

export default Login;

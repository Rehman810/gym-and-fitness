import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const SignOut = () => {
  const navigate = useNavigate();

  const signout = async () => {
    await signOut(auth)
      .then(() => {
        localStorage.removeItem("uid");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    // <Button
    //   variant="danger"
    //   style={{ width: "15vw" }}
    //   onClick={() => signout()}
    // >
    //   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SignOut&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    // </Button>
    <span
      className="btn"
      style={{ backgroundColor: "red", fontSize: "1vw", color: "white" }}
      onClick={() => signout()}
    >
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SignOut&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
  );
};

export default SignOut;

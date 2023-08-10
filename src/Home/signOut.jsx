import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

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
    <div style={{ backgroundColor: "red", cursor: "pointer" }}>
      <span style={{ color: "white" }} onClick={() => signout()}>
        SignOut
      </span>
    </div>
  );
};

export default SignOut;

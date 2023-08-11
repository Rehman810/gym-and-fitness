import React, { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Form = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const Login = async () => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((e) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log("user found", e.user.uid);
            localStorage.setItem("uid", e.user.uid);
            navigate("/");
          } else {
            console.log("user not found", user.uid);
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Try Again",
          text: "Wrong email or password!",
        });
      });
  };

  return (
    <div className="box">
      <div className="container">
        <div className="top-header">
          <header>Login</header>
        </div>
        <div className="input-field">
          <input
            type="email"
            className="input"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="bx bx-user"></i>
        </div>
        <div className="input-field">
          <input
            style={{ marginTop: 20 }}
            type="password"
            className="input"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="bx bx-lock-alt"></i>
        </div>
        <div className="input-field">
          <input
            type="submit"
            className="submit"
            value="Login"
            style={{ marginTop: 20 }}
            onClick={() => Login()}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;

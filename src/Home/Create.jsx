import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { serverTimestamp } from "firebase/firestore";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function Add() {
  let navigate = useNavigate();

  const [name, setName] = useState();
  const [rollNum, setRollNum] = useState();
  const [contact, setContact] = useState();

  const handleSave = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const oneMonthLater = new Date(currentDate);
    oneMonthLater.setMonth(currentDate.getMonth() + 1);

    var now = new Date();

    const monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Octuber",
      "November",
      "December",
    ];
    const month = monthName[now.getMonth()];
    const day = new Date().getDate();
    const year = now.getFullYear();

    const date = `${month} ${day}, ${year}`;
    try {
      const docRef = addDoc(collection(db, "users"), {
        Name: name,
        RollNum: rollNum,
        Contact: contact,
        date: date,
        Date: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  const handleCheckOverdue = () => {
    navigate("/");
  };

  return (
    <>
      <div className="createBox">
        <Button onClick={handleCheckOverdue}>
          &nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;
        </Button>
        <div className="container">
          <div className="top-header">
            <header>Create Participant</header>
          </div>
          <div className="input-field">
            <input
              type="text"
              className="input"
              placeholder="UserName"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <i className="bx bx-user"></i>
          </div>
          <div className="input-field">
            <input
              style={{ marginTop: 20 }}
              type="text"
              className="input"
              placeholder="Roll Number"
              required
              onChange={(e) => setRollNum(e.target.value)}
            />
            <i className="bx bx-lock-alt"></i>
          </div>
          <div className="input-field">
            <input
              style={{ marginTop: 20 }}
              type="text"
              className="input"
              placeholder="Contact Number"
              required
              onChange={(e) => setContact(e.target.value)}
            />
            <i className="bx bx-lock-alt"></i>
          </div>
          <div className="input-field">
            <input
              type="submit"
              className="submit"
              value="Create"
              style={{ marginTop: 20, width: "90%" }}
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Add;

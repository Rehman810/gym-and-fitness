import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Data from "./Data";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";
import { serverTimestamp } from "firebase/firestore";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

function Add() {
  let navigate = useNavigate();
  const options = ["active", "Inactive"];

  const [name, setName] = useState("");
  const [num, setNum] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleEdit = () => {
    setShow(true);
  };

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
        RollNum: num,
        date: date,
        Date: serverTimestamp(), // Store the current timestamp
        hasPaid: false, // Assuming you have a field to track payment status
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // navigate("/");
    setShow(false);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  };

  return (
    <>
      Add User
      <img
        onClick={handleEdit}
        src="https://cdn-icons-png.flaticon.com/512/6711/6711415.png"
        alt="add"
        style={{ width: "30px", cursor: "pointer" }}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Participant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Roll Num</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Roll-Num"
                autoFocus
                onChange={(e) => setNum(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSave(e)}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Data from "./Data";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

function Edit(props) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [rollNum, setRollNum] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleEdit = () => {
    setShow(true);
    setName(props.name);
    setId(props.id);
    setRollNum(props.rollNum);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const washingtonRef = doc(db, "users", id);
    try {
      await updateDoc(washingtonRef, {
        Name: name,
        RollNum: rollNum,
      });
      setShow(false);
      console.log("Document field updated successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error updating document field:", error);
    }
  };
  return (
    <>
      <img
        onClick={handleEdit}
        style={{ width: "30px", cursor: "pointer" }}
        src="https://cdn-icons-png.flaticon.com/512/32/32355.png"
        alt="edit"
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Roll Num</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={rollNum}
                onChange={(e) => setRollNum(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSave(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;

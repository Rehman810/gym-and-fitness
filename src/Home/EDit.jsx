import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Data from "./Data";
import { useNavigate } from "react-router-dom";

function Edit(props) {
  let navigate = useNavigate();
  const options = ["active", "Inactive"];

  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState(options[0]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleEdit = () => {
    setShow(true);
    setTitle(props.title);
    setId(props.id);
    setStatus(props.status);
  };

  const index = Data.map((e) => {
    return e.id;
  }).indexOf(id);

  const handleSave = (e) => {
    e.preventDefault();

    let a = Data[index];
    a.title = title;
    a.state = status;
    navigate("/");
    setShow(false);
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
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {options.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            </div>
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

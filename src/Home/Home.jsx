import React, { Fragment, useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Data from "./Data";
import Edit from "./EDit";
import Add from "./Create";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import SignOut from "./signOut";

function Home() {
  let navigate = useNavigate();

  const [state, setstate] = useState({
    query: "",
    list: [],
  });
  const [users, setUsers] = useState([]);

  const handleCreate = () => {
    navigate("/create");
  };

  const OverDue = () => {
    navigate("/overDue");
  };

  const fetchPost = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(newData);
      console.log(users, newData);
    });
  };

  const handleDeleteField = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Participant will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const Users = doc(db, "users", id);
          await deleteDoc(Users);
          Swal.fire("Deleted!", "Participant has been deleted.", "success");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          console.error("Error deleting document:", error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the document.",
            "error"
          );
        }
      }
    });
  };

  const handleChange = (e) => {
    const results = users.filter((item) => {
      if (e.target.value === "") return item;
      return (
        item.Name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.RollNum.includes(e.target.value)
      );
    });
    setstate({
      query: e.target.value,
      list: results,
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Fragment>
        <div
          style={{
            margin: "6rem",
            width: "65%",
          }}
        >
          <div className="form-group">
            <input
              type="search"
              class="form-control"
              id="formGroupExampleInput"
              placeholder="Serach Title"
              style={{ marginBottom: 20 }}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={OverDue}>Check Overdue Users</Button>
            <SignOut />
            <Button variant="success" onClick={handleCreate}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Create
              User&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
          </div>

          <div style={{ backgroundColor: "white" }}>
            <Table striped borderd hover size="sm">
              <thead>
                <tr>
                  <th className="td">Name</th>
                  <th className="td">Roll Num</th>
                  <th className="td">Date</th>
                  <th
                    className="td"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Actions
                    {/* <img
                      onClick={handleCreate}
                      src="https://cdn-icons-png.flaticon.com/512/6711/6711415.png"
                      alt="add"
                      style={{ width: "30px", cursor: "pointer" }}
                    /> */}
                  </th>
                </tr>
              </thead>
            </Table>
            <div className="scroll">
              <Table striped borderd hover size="sm">
                <tbody>
                  {state.query
                    ? state.list.map((user) => {
                        return (
                          <tr>
                            <td className="td">{user.Name}</td>
                            <td className="td">{user.RollNum}</td>
                            <td className="td">{user.date}</td>
                            <td className="td">
                              <img
                                onClick={() => {
                                  handleDeleteField(user.id);
                                }}
                                style={{
                                  width: "30px",
                                  margin: "10px",
                                  cursor: "pointer",
                                }}
                                src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png"
                                alt="delete"
                              />
                              <Edit
                                id={user.id}
                                name={user.Name}
                                rollNum={user.RollNum}
                              />
                            </td>{" "}
                          </tr>
                        );
                      })
                    : users.map((user) => {
                        return (
                          <tr>
                            <td className="td">{user.Name}</td>
                            <td className="roll">{user.RollNum}</td>
                            <td className="td">{user.date}</td>
                            <td className="td">
                              <img
                                onClick={() => {
                                  handleDeleteField(user.id);
                                }}
                                style={{
                                  width: "30px",
                                  margin: "10px",
                                  cursor: "pointer",
                                }}
                                src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png"
                                alt="delete"
                              />
                              <Edit
                                id={user.id}
                                name={user.Name}
                                rollNum={user.RollNum}
                              />
                            </td>{" "}
                          </tr>
                        );
                      })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
}

export default Home;

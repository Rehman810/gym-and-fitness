import React, { Fragment, useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const OverDue = () => {
  let navigate = useNavigate();
  const [overdueUsers, setOverdueUsers] = useState([]);

  const calculateOverdueUsers = async () => {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const currentDate = new Date(); //i.e. "September 12, 2023"

    const newOverdueUsers = usersSnapshot.docs.filter((userDoc) => {
      const userData = userDoc.data();
      const paymentDate = userData.Date.toDate();
      const oneMonthLater = new Date(paymentDate);
      oneMonthLater.setMonth(paymentDate.getMonth() + 1);

      return currentDate > oneMonthLater && !userData.hasPaid;
    });

    setOverdueUsers(newOverdueUsers);
  };

  const handleCheckOverdue = () => {
    navigate("/");
  };
  useEffect(() => {
    calculateOverdueUsers();
  }, []);

  const handleUpdatePayment = async (userId) => {
    const userRef = doc(db, "users", userId);
    const newPaymentDate = new Date();
    newPaymentDate.setMonth(newPaymentDate.getMonth() + 1);

    await updateDoc(userRef, {
      Date: newPaymentDate,
    });

    const updatedOverdueUsers = overdueUsers.filter(
      (userDoc) => userDoc.id !== userId
    );

    setOverdueUsers(updatedOverdueUsers);
  };

  return (
    <>
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
            {" "}
            <Button onClick={handleCheckOverdue}>
              &nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
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
                    </th>
                  </tr>
                </thead>
              </Table>
              <div className="scroll">
                <Table striped borderd hover size="sm">
                  <tbody>
                    {overdueUsers.length > 0 ? (
                      overdueUsers.map((userDoc) => (
                        <tr key={userDoc.id}>
                          <td className="td">{userDoc.data().Name}</td>
                          <td className="roll">{userDoc.data().RollNum}</td>
                          <td className="td">{userDoc.data().date}</td>
                          <td className="td">
                            <Button
                              onClick={() => handleUpdatePayment(userDoc.id)}
                            >
                              Update Payment
                            </Button>
                          </td>{" "}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="td">
                          No dues available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </>
  );
};

export default OverDue;

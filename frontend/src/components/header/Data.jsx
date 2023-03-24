import React, { useState } from "react";
import axios from "axios";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";

// import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Logout from "./Logout";

export default function Data() {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobno, setMobno] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [getData, setGetData] = useState([]);
  const [data, setData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    mobno: "",
    msg: "",
  });

  const handleGetData = () => {
    axios
      .get("http://localhost:5050/getuserdetails")
      .then((res) => {
        if (res.data.status === 1) {
          // alert(res.data.message);
          setGetData(res.data.response);
          // console.log("Response from backend: ", res);
        } else {
          alert(res.data.message);
          // console.log("Response from backend: ", res);
        }
      })
      .catch((err) => {
        console.log("Error from backend: ", err);
      }, []);
  };

  const deleteEmailHandle = (email, firstname) => {
    if (window.confirm(`Are you sure you want to delete ${firstname}?`)) {
      axios
        .post("http://localhost:5050/userdelete", { email })
        .then(async (res) => {
          if (res.data.status === 1) {
            setMsg(res.data.message);
            await handleGetData();
          } else {
            setMsg(res.data.message);
            console.log("res", res);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const handleShow = async (email, firstname, lastname, mobno) => {
    setShow(true);
    console.log("hiiii");
    setEmail(email);
    setFirstname(firstname);
    setLastname(lastname);
    setMobno(mobno);
    console.log("data=>", data);
  };

  const handleCross = () => {
    setShow(false);
  };

  const handleClose = (e) => {
    setEmail(e.target.value);
    setFirstname(e.target.value);
    setLastname(e.target.value);
    setMobno(e.target.value);

    axios
      .post("http://localhost:5050/userupdate", {
        email,
        firstname,
        lastname,
        mobno,
      })
      .then(async (res) => {
        if (res.data.status === 1) {
          console.log("res-->", res);
          setTimeout(() => {
            setMsg(res.data.message);
          }, 1000);
          await handleGetData();
        } else {
          console.log("res-->", res);
          setMsg(res.data.message);
        }
      })
      .catch((err) => {
        console.log("err-->", err);
      });
    setShow(false);
  };

  // const editDataHandler = (email, firstname) => {
  //   if (window.confirm(`Are you sure you want to edit ${firstname}?`)) {
  //     if (window.prompt(`Please enter your ${email} to confirm deletion`)) {
  //       navigate("/updatedata");
  //     }
  //     // axios.post("http://localhost:5050/userupdate", {email})
  //     // .then((res)=>{
  //     //   if(res.data.status === 1){
  //     //     console.log("res", res);
  //     //     setMsg(res.data.message);
  //     //   }else{
  //     //     console.log("res", res);
  //     //   }
  //     // })
  //     // .catch((err)=>{
  //     //   console.log("err", err);
  //     // })
  //   }
  // };

  return (
    <div>
      <div
        style={{
          width: "80%",
          margin: "auto",
          alignItems: 'center',
          justifyContent: 'space-between',
          display: "flex",
        }}
      >
        {/* <h1 className="page_heading" style={{padding: '0'}}>Get Data from DataBase</h1> */}
        <Logout />
        <div>
          <button className="btnEnabled" onClick={handleGetData}>
            Get Data
          </button>
          {/* {getData.map((data, index) => {  return <p key={index}>{data.firstname} {data.lastname}</p>})} */}
          <div className="msg" style={{margin: '0px'}}>{msg}</div>
        </div>
      </div>
      <Table className="table" striped bordered hover variant="light">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            {/* <th>Password</th> */}
            <th>Mob No.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {getData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.firstname}</td>
              <td>{data.lastname}</td>
              <td>{data.email}</td>
              {/* <td>{data.password}</td> */}
              <td>{data.mobno}</td>
              <td style={{ textAlign: "center" }}>
                {
                  <button
                    onClick={() => {
                      deleteEmailHandle(data.email, data.firstname);
                    }}
                    className="btnEnabled"
                  >
                    <DeleteFilled />
                  </button>
                }
                {
                  <button
                    // onClick={() => {
                    //   editDataHandler(data.email, data.firstname);
                    // }}
                    className="btnEnabled"
                    onClick={() => {
                      handleShow(
                        data.email,
                        data.firstname,
                        data.lastname,
                        data.mobno
                      );
                    }}
                  >
                    <EditOutlined />
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleCross}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                value={firstname}
                placeholder="Firstname"
                onChange={(e) => setFirstname(e.target.value)}
                autoFocus
              />
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                value={lastname}
                placeholder="Lastname"
                onChange={(e) => setLastname(e.target.value)}
                autoFocus
              />
              <Form.Label>Contact No.</Form.Label>
              <Form.Control
                type="number"
                value={mobno}
                placeholder="Contact No."
                onChange={(e) => setMobno(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCross}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

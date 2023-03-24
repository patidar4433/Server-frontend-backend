import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobno, setmobno] = useState(0);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({
    firstname,
    lastname,
    email,
    password,
    mobno,
  });

  console.log(data);

  const handleRegister = (e) => {
    setData({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      mobno: mobno,
    });
    setfirstname(e.target.value);
    setlastname(e.target.value);
    setEmail(e.target.value);
    setPassword(e.target.value);
    setmobno(e.target.value);
    // console.log(firstname, lastname, email, password, mobno);

    axios
      .post("http://localhost:5050/register", {
        firstname,
        lastname,
        email,
        password,
        mobno,
      })
      .then((res) => {
        if (res.data.status === 1) {
          // alert(res.data.message);
          setMsg(res.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          console.log("Response from backend: ", res);
        } else {
          // alert(res.data.message);
          setMsg(res.data.message);
          console.log("Response from backend: ", res);
        }
      })
      .catch((err) => {
        console.log("Error from backend: ", err);
      }, []);
  };

  return (
    <div className="main_div">
      <h1 className="page_heading">Registration</h1>
      <div>
        <input
          className="input"
          type="text"
          value={firstname}
          placeholder="firstname"
          onChange={(e) => setfirstname(e.target.value)}
        />
        <br />
        <input
          className="input"
          type="text"
          value={lastname}
          placeholder="lastname"
          onChange={(e) => setlastname(e.target.value)}
        />
        <br />
        <input
          className="input"
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="input"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          className="input"
          type="number"
          value={mobno}
          placeholder="contact no."
          onChange={(e) => setmobno(e.target.value)}
        />
        <br />
        {firstname.length > 0 &&
        lastname.length > 0 &&
        email.length > 0 &&
        password.length > 0 &&
        mobno.length > 0 ? (
          <button className="btnEnabled" onClick={handleRegister}>
            Register
          </button>
        ) : (
          <button className="btnDisabled" disabled onClick={handleRegister}>
            Register
          </button>
        )}
      </div>
      <div className="msg">{msg}</div>
    </div>
  );
}

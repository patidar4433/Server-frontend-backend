import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  console.log("data", data);

  // const getData = async () => {
  //   axios.get("http://localhost:5050/getuserdetailsbyemail").then((res) => {
  //     console.log("data response",res);
  //     setData(res.data.response[0].firstname);
  //   });
  // };

  const handleLogin = (e) => {
    // console.log("login button clicked...!");
    setData({
      email: email,
      password: password,
    });
    // console.log("email ", email, " password ", password);
    setemail(e.target.value);
    setPassword(e.target.value);
    axios
      .post("http://localhost:5050/userlogin", { email, password })
      .then((res) => {
        if (res.data.status === 1) {
          // alert(res.data.message);
          setTimeout(() => {
            navigate("/getdata");
          }, 2000);
          setMsg(res.data.message);
          localStorage.setItem("Email", res.data.email);

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

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="main_div">
      <h1 className="page_heading">Log in</h1>
      <div style={{width: '90%'}}>
        <input
          className="input"
          onChange={(e) => setemail(e.target.value)}
          type="text"
          value={email}
          placeholder="email"
        />
        <br />
        <input
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="Password"
        />
      </div>
      <Link to="/forgotpassword">Forgot Password</Link>
      <div>
        {email.length > 0 && password.length > 0 ? (
          <button className="btnEnabled" onClick={handleLogin}>
            Login
          </button>
        ) : (
          <button className="btnDisabled" disabled onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
      <div className="msg">{msg}</div>
    </div>
  );
}

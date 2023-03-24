import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    setEmail(e.target.value);
    setPassword(e.target.value);
    setConfirm_Password(e.target.value);
    setTimeout(() => {
      navigate("/login");
    }, 2000);

    axios
      .post("http://localhost:5050/forgotpassword", {
        email,
        password,
        confirm_password,
      })
      .then((res) => {
        if (res.data.status === 1) {
          setMsg(res.data.message);
          console.log("Backend response: ", res);
        } else {
          setMsg(res.data.message);
          console.log("Backend response: ", res);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    <div className="main_div">
      <h1 className="page_heading">Forgot Password</h1>
      <div>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          className="input"
          value={confirm_password}
          onChange={(e) => setConfirm_Password(e.target.value)}
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <div>
        {email.length > 0 && password.length > 0 ? (
          <button className="btnEnabled" onClick={handleResetPassword}>
            Reset
          </button>
        ) : (
          <button
            className="btnDisabled"
            disabled
            onClick={handleResetPassword}
          >
            Reset
          </button>
        )}
      </div>
      <div className="msg">{msg}</div>
    </div>
  );
};

export default ForgotPassword;

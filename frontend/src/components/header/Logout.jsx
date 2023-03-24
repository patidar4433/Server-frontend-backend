import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const email = localStorage.getItem("Email");
  const handleLogout = () => {
    localStorage.removeItem("Email");
    setMsg("You have successfully logged out");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div>
      <div style={{display: 'flex'}}>
        <div style={{ padding: "5px" }}>{(email)?`${email}`:""}</div>
        {(email) ? <button onClick={handleLogout} className="btnEnabled" type="submit">
          Log Out
        </button> : ""}
      </div>
      {(email)?<div className="msg" style={{margin: '0px', width: '100%'}}>{msg}</div>:""}
    </div>
  );
}

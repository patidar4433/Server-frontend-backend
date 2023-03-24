import React from "react";
import { Link, Outlet } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <div>
      <Navbar className="navigationBar" expand="lg">
        <Container>
          <Navbar.Brand className="logo"><Link to="/">D</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <ul className="navbarUl">
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/formvalidation">ValidationForm</Link>
                </li>
                {/* <li>
                  <Link to="/getdata">GetData</Link>
                </li> */}
                {/* <li>
                  <Link to="/updatedata">UpdateData</Link>
                </li> */}
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <div className="menu_div">
        <span>Tech-D</span>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/getdata">GetData</Link>
          </li>
          <li>
            <Link to="/updatedata">UpdateData</Link>
          </li>
        </ul>
      </div> */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

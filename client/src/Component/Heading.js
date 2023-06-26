import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Heading.css";
import { useSelector } from "react-redux";
import firebase from "../firebase.js";

function Heading() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("user", user); // user 상태 변화를 확인하기 위한 로그
  }, [user]);

  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };
  return (
    <Navbar expand="lg" variant="dark" style={{ backgroundColor: "#8064A2" }}>
      <Container>
        <Navbar.Brand href="/">Hueeng</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to={`/list/${user.userNum}`}
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "10px",
              }}
            >
              home
            </Link>

            <Link
              to="/upload"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "10px",
              }}
            >
              upload
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {user.accessToken === "" ? (
            <Link
              to="/login "
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "10px",
              }}
            >
              login
            </Link>
          ) : (
            <Navbar.Text
              style={{ color: "white", cursor: "pointe" }}
              onClick={() => LogoutHandler()}
            >
              Logout
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Heading;

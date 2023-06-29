import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Heading.css";
import { useSelector } from "react-redux";
import firebase from "../firebase.js";
import { useLocation } from "react-router-dom";

function Heading() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const uploadnum = pathname.split("/")[2];
  useEffect(() => {
    console.log("user", user);
  }, [user]);
  console.log(uploadnum);
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
            {user.accessToken === "" ? (
              <div></div>
            ) : (
              <div>
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
              </div>
            )}
            <Link
              to={`/upload/${uploadnum}`}
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

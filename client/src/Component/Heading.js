import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Heading.css";

function Heading() {
  return (
    <Navbar expand="lg" variant="dark" style={{ backgroundColor: "#8064A2" }}>
      <Container>
        <Navbar.Brand href="#home">Hueeng</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/upload"
                style={{ color: "white", textDecoration: "none" }}
              >
                upload
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/list "
                style={{ color: "white", textDecoration: "none" }}
              >
                list
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Heading;

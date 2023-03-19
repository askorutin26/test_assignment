import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const Nav = () => {
  return (
    <Navbar bg="white" className="shadow-sm sticky-top" expand="lg">
      <Container className="d-flex align-items-center justify-content-start ">
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none link-secondary">
            Hacker News
          </Link>
          <Button
            variant="link"
            className="bi bi-caret-up text-secondary"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
// i18 ?
export default Nav;

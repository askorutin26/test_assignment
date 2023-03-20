import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";

import { useAppContext } from "../Context/App";

const Nav = () => {
  const AppContext = useAppContext();
  const { saveNews } = AppContext;
  return (
    <Navbar bg="white" className="shadow-sm sticky-top" expand="lg">
      <Container className="d-flex align-items-center justify-content-start ">
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none link-secondary">
            Hacker News
          </Link>
          <Button
            variant="light"
            className="bi bi-caret-up text-secondary ms-2"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          />
          <Button variant="light" className="btn-space ms-2" onClick={saveNews}>
            <i className="bi bi-arrow-clockwise" />
          </Button>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
// i18 ?
export default Nav;

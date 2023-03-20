import React from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="d-flex justify-content-center mt-1">
      <Card className="w-75 mb-5">
        <Card.Body>
          <Card.Link className="h3 link-dark text-decoration-none d-flex justify-content-center align-items-center text-center">
            Похоже, что новость удалена
          </Card.Link>

          <Container className="d-flex flex-row align-items-center">
            <Link to="/" className="text-decoration-none link-secondary">
              <Button variant="light">
                <i className="bi bi-caret-left" />
                Вернуться назад
              </Button>
            </Link>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default NotFound;
//

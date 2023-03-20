import React from "react";

import Card from "react-bootstrap/Card";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TimeDiff from "js-time-diff";
import { useNavigate } from "react-router-dom";

const getDifferenceString = (elemTime) => {
  const elemDate = new Date(elemTime * 1000);
  const currentDate = new Date();
  return TimeDiff(elemDate, currentDate);
};

const getTitleElem = (target) => {
  if (target.classList.contains("card")) {
    const title = target.querySelector("div.card-title");
    return title;
  } else {
    const parent = target.closest("div.card");
    const title = parent.querySelector("div.card-title");
    return title;
  }
};

const NewsElem = ({ elem }) => {
  const { by, id, time, title, score } = elem;

  const navigate = useNavigate();

  return (
    <Card
      className="border-top-0 border-right-0 rounded d-flex"
      id={id}
      onMouseEnter={(e) => {
        const { target } = e;
        const title = getTitleElem(target);
        title.classList.add("text-info");
      }}
      onMouseLeave={(e) => {
        const { target } = e;
        const title = getTitleElem(target);
        if (title.classList.contains("text-info")) {
          title.classList.remove("text-info");
        }
      }}
    >
      <Row>
        <Col
          className="d-flex flex-column justify-content-center align-items-center bg-light "
          xs={1}
        >
          <h5>{score}</h5>
        </Col>
        <Col className="m-2">
          <Card.Title
            id={id}
            onClick={(e) => {
              const { target } = e;
              const { id } = target;
              navigate(`/news/${id}`);
            }}
            className="stretched-link"
          >
            {title}
          </Card.Title>
          <div className="d-flex flex-row justify-content-start align-items-start">
            <Card.Subtitle className="fw-light">
              {getDifferenceString(time)} by {by}
            </Card.Subtitle>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default NewsElem;

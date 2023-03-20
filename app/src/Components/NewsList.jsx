import React from "react";

import ListGroup from "react-bootstrap/ListGroup";

import NewsElem from "./NewsElem.jsx";

import newsStore from "../store/newsStore";
import Container from "react-bootstrap/Container";

import { observer } from "mobx-react-lite";

const NewsList = observer(() => {
  const list = [];
  newsStore
    .getAllNews()
    .slice()
    .sort((a, b) => a.time - b.time)
    .forEach((elem, index) => {
      list.unshift(<NewsElem elem={elem} key={elem.id} />);
    });

  return (
    <Container className="w-100 d-flex justify-content-center ">
      <ListGroup as="ul" className="d-flex justify-content-center">
        {list}
      </ListGroup>
    </Container>
  );
});
//
export default NewsList;

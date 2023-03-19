import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";

import NewsElem from "./NewsElem.jsx";

import newsStore from "../store/newsStore";
import Container from "react-bootstrap/Container";

import { observer } from "mobx-react-lite";

import axios from "axios";
import routes from "../api.js";
import commentsStore from "../store/commentsStore.js";
import differenceBy from "lodash.differenceby";
const NewsList = observer(() => {
  return (
    <Container className="w-100 d-flex justify-content-center">
      <ListGroup as="ul" className="d-flex justify-content-center">
        {newsStore.getAllNews().map((elem, index) => {
          return <NewsElem elem={elem} key={elem.id} />;
        })}
      </ListGroup>
    </Container>
  );
});
//
export default NewsList;
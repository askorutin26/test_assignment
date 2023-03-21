import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import commentsStore from "../store/commentsStore.js";

import Card from "react-bootstrap/Card";
import NavDropdown from "react-bootstrap/NavDropdown";
import Comment from "./Comment.jsx";

const CommentsList = observer(({ newsID }) => {
  const [show, setShow] = useState(true);

  const commentsToShow = commentsStore.getComments(newsID);

  const list = [];
  commentsToShow
    ?.sort((a, b) => b.time - a.time)
    .forEach((comment) => {
      const { id } = comment;
      list.push(<Comment comment={comment} key={id} />);
    });

  return (
    <Card className="border-0 rounded-top d-flex">
      <Card.Header className="d-flex justify-content-start">
        Комментарии
        <NavDropdown
          title={
            <span>
              <i className="fad fa-newspaper " />
            </span>
          }
          id="collasible-nav-dropdown"
        >
          <NavDropdown.Item
            onClick={(e) => {
              setShow(!show);
            }}
          >
            {show ? "Скрыть" : "Показать"}
          </NavDropdown.Item>
        </NavDropdown>
      </Card.Header>
      {show && list}
    </Card>
  );
});

export default CommentsList;

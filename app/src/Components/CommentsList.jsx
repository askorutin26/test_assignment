import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import commentsStore from "../store/commentsStore.js";

import Card from "react-bootstrap/Card";
import NavDropdown from "react-bootstrap/NavDropdown";
import Comment from "./Comment.jsx";
import axios from "axios";
import api from "../api.js";
import { useAppContext } from "../Context/App.jsx";
const getComment = async (commentID) => {
  const { data } = await axios.get(api.getOne(commentID));
  return data;
};

const CommentsList = observer(({ newsID, kids }) => {
  const AppContext = useAppContext();
  const { load, newsLoaded, commentsLoaded, nestedcommentsLoaded } = AppContext;
  /* useEffect(() => {
    const saveComments = async () => {
      const rootCommentsPromise = Promise.all(
        kids.map(async (commentID) => {
          const commentData = getComment(commentID);
          return commentData;
        })
      );

      rootCommentsPromise.then((rootComments) => {
        rootComments.forEach((rootComment) => {
          commentsStore.addComment(newsID, rootComment);
        });
      });
    };
    saveComments();
  }, [kids, newsID]); */

  const [show, setShow] = useState(true);
  const list = [];

  commentsLoaded &&
    commentsStore.getComments(newsID).forEach((comment) => {
      const { kids, id } = comment;
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

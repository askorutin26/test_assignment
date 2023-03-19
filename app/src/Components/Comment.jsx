import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import api from "../api";
import nestedCommentsStore from "../store/nestedComments";
import { observer } from "mobx-react-lite";
import { useAppContext } from "../Context/App.jsx";
const getComment = async (commentID) => {
  const { data } = await axios.get(api.getOne(commentID));
  return data;
};
const ShowNestedButton = ({ show, setShowNested }) => {
  const btnClass = show ? "bi-caret-up" : "bi-caret-down";
  return (
    <Button
      variant="link"
      className={`p-0  bi ${btnClass} text-secondary text-decoration-none`}
      onClick={() => {
        setShowNested(!show);
      }}
    >
      {show ? "Свернуть" : "Раскрыть ветку"}
    </Button>
  );
};
const Comment = observer(({ comment }) => {
  const { by, text, id: commentID, kids, deleted } = comment;
  const [showNested, setShowNested] = useState(false);
  const AppContext = useAppContext();
  const { load, commentsLoaded, nestedcommentsLoaded } = AppContext;
  useEffect(() => {
    const saveNestedComments = async () => {
      if (kids) {
        kids.forEach((nestedComment, nestedIndex) => {
          const data = getComment(nestedComment);
          data.then((commentData) => {
            nestedCommentsStore.addNestedComment(commentID, commentData);
            if (nestedIndex === kids.length - 1) {
              load("nested");
            }
          });
        });
      }
    };
    saveNestedComments();
  }, []);

  const nestedCommentsList = nestedCommentsStore.getNestedComments(commentID);
  const list =
    nestedCommentsList &&
    nestedCommentsList.map((nested, index) => (
      <Comment comment={nested} key={index + nested.id} />
    ));
  return (
    <Card className="border-0 border-bottom d-flex align-items-start">
      {deleted ? (
        "[deleted]"
      ) : (
        <>
          <Card.Subtitle className="ms-3 mt-3">{by}:</Card.Subtitle>
          <Card.Body className="d-flex pb-0">
            <Card.Text
              className=" m-0 p-1 text-wrap"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </Card.Body>
          {kids && (
            <ShowNestedButton show={showNested} setShowNested={setShowNested} />
          )}
          {showNested && nestedCommentsList && list}
        </>
      )}
    </Card>
  );
});

export default Comment;
//nestedCommentsStore.addNestedComment(id, commentData);

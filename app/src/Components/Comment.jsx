import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { observer } from "mobx-react-lite";

const ShowNestedButton = ({ show, setShowNested }) => {
  const caretClass = show ? "bi-caret-up" : "bi-caret-down";
  const colorClass = show ? "text-info" : "text-dark";
  return (
    <Button
      variant="link"
      className={`p-0  bi ${caretClass} text-secondary text-decoration-none ${colorClass}`}
      onClick={() => {
        setShowNested(!show);
      }}
    >
      {show ? "Свернуть" : "Раскрыть ветку"}
    </Button>
  );
};
const Comment = observer(({ comment }) => {
  const { by, text, deleted, nestedComments } = comment;
  const [showNested, setShowNested] = useState(false);

  const nestedList =
    nestedComments &&
    nestedComments.map((nested, index) => (
      <div className="ps-4 d-flex " key={(index === 0 ? 1 : index) + nested.id}>
        <Comment comment={nested} />
      </div>
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
          {nestedComments && (
            <ShowNestedButton show={showNested} setShowNested={setShowNested} />
          )}
          {showNested && nestedList}
        </>
      )}
    </Card>
  );
});

export default Comment;
//nestedCommentsStore.addNestedComment(id, commentData);

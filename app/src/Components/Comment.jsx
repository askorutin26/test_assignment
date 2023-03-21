import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { observer } from "mobx-react-lite";

import commentsStore from "../store/commentsStore";
import { useAppContext } from "../Context/App";

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
  const AppContext = useAppContext();
  const { getDifferenceString } = AppContext;

  const { by, text, deleted, time, kids, id } = comment;

  const [showNested, setShowNested] = useState(false);
  const nested = kids && commentsStore.getComments(id);
  const nestedList =
    nested &&
    nested.map((nested, index) => (
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
          <div className="ms-3 fs-6 text-muted">
            {getDifferenceString(time)}
          </div>

          <Card.Body className="d-flex pb-0">
            <Card.Text
              className=" m-0 p-1 text-wrap"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </Card.Body>
          {nested && (
            <ShowNestedButton show={showNested} setShowNested={setShowNested} />
          )}
          {showNested && nestedList}
        </>
      )}
    </Card>
  );
});

export default Comment;

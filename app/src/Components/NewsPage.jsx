import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import CommentsList from "./CommentsList";
import NotFound from "./NotFound";

import { useAppContext } from "../Context/App";
import commentsStore from "../store/commentsStore.js";
import newsStore from "../store/newsStore";

const NewsPage = observer(() => {
  const AppContext = useAppContext();
  const { saveComments, commentsLoaded } = AppContext;
  const params = useParams();
  const newsID = Number(params.id);

  const news = newsStore.getNews(newsID);
  if (!news) {
    return <NotFound />;
  } else {
    const { by, kids, time, title, url } = news;

    const date = new Date(time * 1000).toLocaleString();

    let commentsCount = commentsStore.getCommentsCount(newsID);
    if (commentsLoaded) {
      commentsCount = commentsStore.getCommentsCount(newsID);
    }
    useEffect(() => {
      saveComments(newsID);
    }, [kids, newsID, saveComments]);

    return (
      <Container className="d-flex justify-content-center mt-1">
        <Card className="w-75 mb-5">
          <Card.Body>
            <Card.Link
              className="h3 link-dark text-decoration-none d-flex justify-content-center align-items-center text-center"
              href={url}
              target="_blank"
            >
              {title}
            </Card.Link>

            <Container className="d-flex flex-row align-items-center">
              <Link to="/" className="text-decoration-none link-secondary">
                <Button variant="light">
                  <i className="bi bi-caret-left" />
                </Button>
              </Link>
              <Button
                variant="light ms-2"
                className=""
                onClick={() => saveComments(newsID)}
              >
                <i className="bi bi-arrow-clockwise" />
              </Button>
              <Container className="d-flex flex-column align-items-end justify-content-end ">
                <Card.Subtitle className="mb-2 text-muted text-center">
                  by: {by}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted text-center">
                  {date}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted text-center">
                  {`${commentsCount} comments`}
                </Card.Subtitle>
              </Container>
            </Container>

            {commentsLoaded && <CommentsList newsID={newsID} />}
          </Card.Body>
        </Card>
      </Container>
    );
  }
});

export default NewsPage;
//

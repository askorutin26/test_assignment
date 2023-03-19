import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import newsStore from "../store/newsStore";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import CommentsList from "./CommentsList";
import { useAppContext } from "../Context/App.jsx";
import { observer } from "mobx-react-lite";

import commentsStore from "../store/commentsStore.js";
import axios from "axios";
import api from "../api.js";
const NewsPage = () => {
  const params = useParams();
  const newsID = Number(params.id);

  const { by, id, kids, score, time, title, type, url } =
    newsStore.getNews(newsID);

  const date = new Date(time * 1000).toLocaleString();
  const AppContext = useAppContext();
  const { load, commentsLoaded, nestedcommentsLoaded } = AppContext;
  useEffect(() => {
    const saveComments = async () => {
      if (kids && !commentsStore.getComments(newsID)) {
        kids.forEach(async (comment, kidsIndex) => {
          const { data: commentData } = await axios.get(api.getOne(comment));
          commentsStore.addComment(newsID, commentData);
          if (kidsIndex === kids.length - 1) {
            load("comments", newsID);
          }
        });
      }
    };
    saveComments();
  }, []);

  return (
    <Container className="d-flex justify-content-center mt-1">
      <Card className="w-75">
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

            <Container className="d-flex flex-column align-items-end justify-content-end ">
              <Card.Subtitle className="mb-2 text-muted text-center">
                by: {by}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted text-center">
                {date}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted text-center">
                {`${2} comments`}
              </Card.Subtitle>
            </Container>
          </Container>

          {commentsStore.getComments(newsID) && (
            <CommentsList kids={kids} newsID={newsID} />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewsPage;
//

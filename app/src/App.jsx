import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav.jsx";

import Container from "react-bootstrap/esm/Container.js";
import NewsList from "./Components/NewsList.jsx";
import NewsPage from "./Components/NewsPage.jsx";
import axios from "axios";
import api from "./api.js";
import newsStore from "./store/newsStore.js";
import { observer } from "mobx-react-lite";
import differenceBy from "lodash.differenceby";
import { useAppContext } from "./Context/App.jsx";
const updateNews = async () => {
  const { data: ids } = await axios.get(api.getNewsIDs());
  const oldIds = newsStore.getAllNews().map((news) => news.id);
  const difference = differenceBy(ids, oldIds);

  if (difference.length > 0) {
    console.log("POLUNDRA");
    console.log(ids);
    console.log(oldIds);
    console.log(difference);
  }
};

const App = () => {
  const AppContext = useAppContext();
  const { load, newsLoaded, commentsLoaded, nestedcommentsLoaded } = AppContext;

  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <Container fluid className="g-0">
              {<NewsList />}
            </Container>
          }
        />
        <Route path={"news/:id"} element={newsLoaded && <NewsPage />} />
      </Routes>
    </Router>
  );
};
export default App;
//  <Route path={'/news'} element={} />
//

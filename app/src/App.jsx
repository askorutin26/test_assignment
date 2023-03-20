import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav.jsx";

import Container from "react-bootstrap/esm/Container.js";
import NewsList from "./Components/NewsList.jsx";
import NewsPage from "./Components/NewsPage.jsx";

import { observer } from "mobx-react-lite";
import { useAppContext } from "./Context/App.jsx";
const App = observer(() => {
  const AppContext = useAppContext();
  const { newsLoaded, saveNews } = AppContext;
  useEffect(() => {
    saveNews();
    let timerId = setInterval(saveNews, 10000 * 60);
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <Container fluid className="g-0">
              {newsLoaded && <NewsList />}
            </Container>
          }
        />
        <Route path={"news/:id"} element={newsLoaded && <NewsPage />} />
      </Routes>
    </Router>
  );
});
export default App;
//  <Route path={'/news'} element={} />
//

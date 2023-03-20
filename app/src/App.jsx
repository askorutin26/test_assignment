import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Container from "react-bootstrap/esm/Container.js";
import Nav from "./Components/Nav.jsx";
import NewsList from "./Components/NewsList.jsx";
import NewsPage from "./Components/NewsPage.jsx";

import { useAppContext } from "./Context/App.jsx";

const App = observer(() => {
  const AppContext = useAppContext();
  const { newsLoaded, saveNews } = AppContext;
  useEffect(() => {
    saveNews();
    setInterval(saveNews, 10000 * 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

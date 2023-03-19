import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import newsStore from "../store/newsStore";
import api from "../api.js";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [newsLoaded, setLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [nestedCommentsLoaded, setNestedLoaded] = useState(false);
  const load = (type, ID) => {
    switch (type) {
      case "news":
        setLoaded(true);
        break;
      case "comments":
        setCommentsLoaded(ID);
        break;
      case "nested":
        setNestedLoaded(ID);
        break;
      default:
        console.log(`Unexpected type: ${type}`);
    }
  };
  useEffect(() => {
    const getIDs = async () => {
      const { data: ids } = await axios.get(api.getNewsIDs());

      const newsPromise = Promise.all(
        ids.map(async (id) => {
          const { data: news } = await axios.get(api.getOne(id));
          return news;
        })
      );
      newsPromise.then((data) => {
        const sorted = data.sort((a, b) => {
          return new Date(b.time) - new Date(a.time);
        });
        sorted.forEach((sortedNew) => {
          newsStore.addNews(sortedNew);
        });
        load("news");
      });
    };

    getIDs();
    //let timerId = setInterval(updateNews, 1000 * 10);
  }, []);
  const props = { newsLoaded, commentsLoaded, nestedCommentsLoaded, load };
  return <AppContext.Provider value={props}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppProvider };

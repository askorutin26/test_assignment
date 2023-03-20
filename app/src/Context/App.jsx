import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import commentsStore from "../store/commentsStore.js";
import newsStore from "../store/newsStore.js";
import api from "../api.js";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  let [commentsLoaded, setCommentsLoaded] = useState(false);
  let [newsLoaded, setNewsLoaded] = useState(false);

  const saveComments = async (newsID) => {
    const { data: newsData } = await axios.get(api.getOne(newsID));

    const { kids } = newsData;
    if (kids) {
      kids.forEach(async (comment, kidsIndex) => {
        const { data: commentData } = await axios.get(api.getOne(comment));
        const { kids: rootKids } = commentData;
        if (rootKids) {
          rootKids.forEach(async (nested, index) => {
            const nestedComments = [];
            const { data: nestedData } = await axios.get(api.getOne(nested));
            nestedComments.push(nestedData);
            if (index === rootKids.length - 1) {
              commentData.nestedComments = nestedComments;
              commentsStore.addComment(newsID, commentData);
            }
          });
        } else {
          commentsStore.addComment(newsID, commentData);
        }
        if (kidsIndex === kids.length - 1) {
          setCommentsLoaded(true);
        }
      });
    }
  };

  const saveNews = async () => {
    setNewsLoaded(false);
    const { data: ids } = await axios.get(api.getNewsIDs());

    const newsPromise = Promise.all(
      ids.map(async (id) => {
        const { data: news } = await axios.get(api.getOne(id));
        return news;
      })
    );
    newsPromise.then((data) => {
      data.forEach((news, index) => {
        newsStore.addNews(news);
        if (index === data.length - 1) {
          setNewsLoaded(true);
        }
      });
    });
  };

  const props = {
    saveComments,
    commentsLoaded,
    setCommentsLoaded,
    newsLoaded,
    setNewsLoaded,
    saveNews,
  };
  return <AppContext.Provider value={props}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppProvider };

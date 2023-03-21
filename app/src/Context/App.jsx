import React, { useState, createContext, useContext } from "react";
import commentsStore from "../store/commentsStore.js";
import newsStore from "../store/newsStore.js";
import api from "../api.js";
import axios from "axios";
import TimeDiff from "js-time-diff";

const AppContext = createContext({});

const getDifferenceString = (elemTime) => {
  const elemDate = new Date(elemTime * 1000);
  const currentDate = new Date();
  return TimeDiff(elemDate, currentDate);
};

const saveComments = async (comments) => {
  const commentsLength = comments.length;
  for (let i = 0; i < commentsLength; i += 1) {
    const commentID = comments[i];
    const { data: commentData } = await axios.get(api.getOne(commentID));

    const { kids } = commentData;
    if (kids) {
      saveComments(kids);
    }
    commentsStore.addComment(commentData);
  }
};
const updateComments = async (newsID) => {
  const { data: newsData } = await axios.get(api.getOne(newsID));
  const { kids } = newsData;
  if (kids) {
    saveComments(kids);
  }
};

const AppProvider = ({ children }) => {
  let [commentsLoaded, setCommentsLoaded] = useState(false);
  let [newsLoaded, setNewsLoaded] = useState(false);

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
    updateComments,
    commentsLoaded,
    setCommentsLoaded,
    newsLoaded,
    setNewsLoaded,
    saveNews,
    getDifferenceString,
  };
  return <AppContext.Provider value={props}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppProvider };

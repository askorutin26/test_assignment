const baseURL = "https://hacker-news.firebaseio.com/v0";

const getNewsIDs = () =>
  `${baseURL}/topstories.json?print=pretty&orderBy="$key"&limitToFirst=100`;

const getOne = (id) => `${baseURL}/item/${id}.json?print=pretty`;

const routes = {
  getNewsIDs,
  getOne,
};
export default routes;

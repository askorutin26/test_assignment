import { makeAutoObservable } from "mobx";

class News {
  state = [];
  constructor() {
    makeAutoObservable(this);
  }

  addNews(news) {
    const newsExist = this.getNews(news.id);
    if (newsExist) {
      const index = this.state.indexOf(newsExist);
      this.state[index] = news;
    } else {
      if (this.state.length === 100) {
        this.state.pop();
        this.state.unshift(news);
      } else {
        this.state.unshift(news);
      }
    }
  }
  getNews(id) {
    return this.state.find((elem) => elem.id === id);
  }
  getAllNews() {
    return this.state;
  }
  getAllNewsIds() {
    return this.state.map((news) => news.id);
  }
}
const newsStore = new News();
export default newsStore;
//1 The quantum state of a TCP port
//100 Ask HN: What has your personal website/blog done for you?

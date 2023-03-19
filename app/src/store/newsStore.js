import { makeAutoObservable, makeObservable, action } from "mobx";

class News {
  state = [];
  constructor() {
    makeAutoObservable(this);
  }

  addNews(news) {
    this.state.push(news);
  }
  getNews(id) {
    return this.state.find((elem) => elem.id === id);
  }
  getAllNews() {
    return this.state;
  }
}
const newsStore = new News();
export default newsStore;

import { makeAutoObservable, makeObservable, action } from "mobx";

class Comments {
  state = {};
  constructor() {
    makeAutoObservable(this);
  }

  addComments(comment) {
    this.state = comment;
  }
  addComment(newsID, comment) {
    newsID in this.state
      ? this.state[newsID].push(comment)
      : (this.state[newsID] = [comment]);
  }
  getComments(newsID) {
    return this.state[newsID];
  }
  getLength(id) {
    return this.state[id].length;
  }
  getAllCommentsLength() {
    let length = 0;
    const keys = Object.keys(this.state);
    keys.forEach((key) => (length += this.state[key].length));
    return length;
  }
  getAllComments() {
    return this.state;
  }
}
const commentsStore = new Comments();
export default commentsStore;
//nested comment

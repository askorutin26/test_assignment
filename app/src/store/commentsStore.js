import { makeAutoObservable } from "mobx";

class Comments {
  state = [];
  constructor() {
    makeAutoObservable(this);
  }

  addComment(comment) {
    const { id: commentID } = comment;
    const commentExists = this.getComment(commentID);
    if (commentExists) {
      const commentIndex = this.state.indexOf(commentExists);
      this.state[commentIndex] = comment;
    } else {
      this.state.push(comment);
    }
  }
  getComments(ID) {
    return this.state.filter((comment) => comment.parent === ID);
  }
  getComment(ID) {
    return this.state.find((comment) => comment.id === ID);
  }
}
const commentsStore = new Comments();
export default commentsStore;

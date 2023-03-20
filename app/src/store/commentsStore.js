import { makeAutoObservable } from "mobx";

class Comments {
  state = {};
  constructor() {
    makeAutoObservable(this);
  }

  addComment(newsID, comment) {
    const commentExists = this.state[newsID]?.find(
      (elem) => elem.id === comment.id
    );
    if (commentExists) {
      const commentIndex = this.state[newsID].indexOf(commentExists);
      this.state[newsID][commentIndex] = comment;
    } else {
      newsID in this.state
        ? this.state[newsID].push(comment)
        : (this.state[newsID] = [comment]);
    }
  }
  getComments(newsID) {
    return this.state[newsID];
  }
  getCommentsCount(newsID) {
    const comments = this.getComments(newsID);
    let count = 0;
    comments &&
      comments.forEach((comment) => {
        count += 1;
        if ("nestedComments" in comment) {
          const nestedCount = comment.nestedComments.length;
          count += nestedCount;
        }
      });

    return count;
  }
}
const commentsStore = new Comments();
export default commentsStore;

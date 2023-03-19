import { makeAutoObservable, makeObservable, action } from "mobx";

class NestedComments {
  nestedComments = {};
  constructor() {
    makeAutoObservable(this);
  }

  addNestedComments(nestedComment) {
    this.nestedComments = nestedComment;
  }
  addNestedComment(rootCommentID, nestedComment) {
    rootCommentID in this.nestedComments
      ? this.nestedComments[rootCommentID].push(nestedComment)
      : (this.nestedComments[rootCommentID] = [nestedComment]);
  }
  getNestedComments(rootID) {
    return this.nestedComments[rootID];
  }
}
const nestedCommentsStore = new NestedComments();
export default nestedCommentsStore;
//nested comment

import { makeAutoObservable, makeObservable, action } from "mobx";

class NestedComments {
  nestedComments = {};
  constructor() {
    makeAutoObservable(this);
  }

  addNestedComment(newsID, nestedComment) {
    const commentExists = this.nestedComments[newsID]?.find(
      (elem) => elem.id === nestedComment.id
    );
    if (commentExists) {
      const commentIndex = this.nestedComments[newsID].indexOf(commentExists);
      this.nestedComments[newsID][commentIndex] = nestedComment;
    } else {
      newsID in this.nestedComments
        ? this.nestedComments[newsID].push(nestedComment)
        : (this.nestedComments[newsID] = [nestedComment]);
    }
  }
  getNestedComments(newsID, rootCommentID) {
    const newsComments = this.nestedComments[newsID];
    return newsComments?.filter((elem) => elem.parent === rootCommentID);
  }
  getNestedCommentsCount(newsID) {
    const nestedComments = this.getNestedComments(newsID);
    return nestedComments ? nestedComments.length : 0;
  }
}
const nestedCommentsStore = new NestedComments();
export default nestedCommentsStore;
//nested comment

import { useState } from "react";
import Buttons from "../controls/Buttons";
import axios from "axios";

export default function CommentForm({setAddComment, discussionId, currentUserId}) {
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
    .post("http://localhost:3001/api/comments", {body: comment, discussion_id: discussionId, user_id: currentUserId })
    .then((res) => setAddComment(true))
    .catch((err) => console.log(err));
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Leave a comment"
          rows="5"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <Buttons variant="outlined" onClick={handleSubmit}>Add comment</Buttons>
    </form>
  );
};
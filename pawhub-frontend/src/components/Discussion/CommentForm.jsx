import { useState } from "react";

export default function CommentForm() {
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
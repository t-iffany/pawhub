import React from "react";
import moment from "moment";

export default function CommentList ({ comments, discussionId }) {
  return (
    <div className="comments-list-container">
      <h2 className="comments-list-title">Comments</h2>
      <div className="comments-list-scrollable">
        {comments.filter((comment) => comment.discussion_id === Number(discussionId)).map((comment, index) => (
          <div key={index} className="comment">
            <div className="comment-header">
              <h3 className="comment-author">Commenter's name</h3>
              <span className="comment-date">{moment(comment.created_at).fromNow()}</span>
            </div>
            <p className="comment-text">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
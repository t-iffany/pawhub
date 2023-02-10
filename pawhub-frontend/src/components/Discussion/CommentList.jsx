import React from "react";
import moment from "moment";
import Avatar from "@mui/material/Avatar";

export default function CommentList ({ comments, discussionId, users }) {
  const findUserById = (userId) =>
    users.find((user) => user.id === userId);

  return (
    <div className="comments-list-container">
      <h2 className="comments-list-title">Comments</h2>
      <div className="comments-list-scrollable">
        {comments.filter((comment) => comment.discussion_id === Number(discussionId)).map((comment, index) => (
          <div key={index} className="comment">
            <div className="comment-header">
              <div className="comment-author-info">
                <Avatar alt={findUserById(comment.user_id).username} src={findUserById(comment.user_id).avatar} />
                <h3 className="comment-author">{findUserById(comment.user_id).username}</h3>
              </div>
              <span className="comment-date">{moment(comment.created_at).fromNow()}</span>
            </div>
            <p className="comment-text">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
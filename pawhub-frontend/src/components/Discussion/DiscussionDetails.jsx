import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import "./DiscussionDetails.css"

export default function DiscussionDetails({currentUser}) {
  const { id } = useParams();
  const [state, setState] = useState({
    discussion: {},
    users: [],
    comments: []
  });
  const [addComment, setAddComment] = useState(false)

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/api/discussions/${id}`),
      axios.get("http://localhost:3001/api/users"),
      axios.get("http://localhost:3001/api/comments")
    ])
      .then((res) => {
        setState((prev) => ({
          ...prev,
          discussion: res[0].data,
          users: res[1].data,
          comments: res[2].data
        }));
      })
      .catch((err) => console.log(err));
      setAddComment(false);
  }, [addComment]);

  const findUserById = (userId) =>
    state.users.find((user) => user.id === userId);
    
  const user = findUserById(state.discussion.user_id);

  return (
    <div className="blog-post">
      <h2 className="title">{state.discussion.title}</h2>
      <p className="author">by {user ? user.username : ""}</p>
      <p className="content">{state.discussion.content}</p>
      <p className="date">posted {moment(state.discussion.created_at).fromNow()} </p>
      <CommentList discussionId={id} comments={state.comments} users={state.users}/>
      {currentUser && <div>
        <CommentForm discussionId={id} currentUserId={currentUser.id}setAddComment={setAddComment}/>
      </div>}
    </div>
    
  );
}

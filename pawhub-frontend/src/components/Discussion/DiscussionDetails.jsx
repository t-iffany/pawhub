import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import CommentList from "./CommentList";

export default function DiscussionDetails() {
  const { id } = useParams();
  const [state, setState] = useState({
    discussion: {},
    user: {},
    comments: []
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/api/discussions/${id}`)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          discussion: res.data
        }));
        return axios.get(`http://localhost:3001/api/users/${res.data.user_id}`);
      })
      .then((res)=> {
        setState((prev) => ({
          ...prev,
          user: res.data
        }));
        return axios.get('http://localhost:3001/api/comments');
      })
      .then((res)=> {
        setState((prev) => ({
          ...prev,
          comments: res.data
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="blog-post">
      <h2 className="title">{state.discussion.title}</h2>
      <p className="author">by {state.user.username}</p>
      <p className="content">{state.discussion.content}</p>
      <p className="date">posted {moment(state.discussion.created_at).fromNow()} </p>
      <CommentList discussionId={id} comments={state.comments}/>
    </div>
    
  );
}

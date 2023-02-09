import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function DiscussionDetails() {
  const { id } = useParams();
  const [state, setState] = useState({
    discussion: {},
    user: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/api/discussions/${id}`),
      axios.get("http://localhost:3001/api/users"),
    ])
      // Our res is an array of the response received: [{discussions}, {users}]
      .then((res) => {

        setState((prev) => ({
          ...prev,
          discussion: res[0].data,
          user: res[1].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="blog-post">
    <h2 className="title">{state.discussion.title}</h2>
    <p className="author">by Author</p>
    <p className="content">{state.discussion.content}</p>
    <p className="date">posted {moment(state.discussion.created_at).fromNow()} </p>
  </div>
  );
}

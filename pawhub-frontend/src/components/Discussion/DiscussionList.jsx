import Buttons from "../controls/Buttons";
import DiscussionListItem from "./DiscussionListItem";
import SimpleContainer from "./SimpleContainer";
import axios from "axios";
import { useState, useEffect } from "react";
import DiscussionForm from "./DiscussionForm";
import Popup from "../controls/Popup";
import { Link } from "react-router-dom";

export default function DiscussionList({currentUser}) {
  const [state, setState] = useState({
    discussions: [],
    users: [],
    comments: []
  });
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/discussions"),
      axios.get("http://localhost:3001/api/users"),
      axios.get("http://localhost:3001/api/comments")
    ])
      // Our res is an array of the response received: [{discussions}, {users}]
      .then((res) => {

        setState((prev) => ({
          ...prev,
          discussions: res[0].data,
          users: res[1].data,
          comments: res[2].data
        }));
      })
      .catch((err) => console.log(err));
  }, [openPopup]);

  const findUserById = (userId) =>
    state.users.find((user) => user.id === userId);

  const commentCount = (discussionId) => {
    return state.comments.filter((comment) => comment.discussion_id === Number(discussionId)).length;
  };
    
  const discussionPosts = state.discussions
    .sort((a,b) => b.id > a.id ? 1 : -1)
    .map((discussion) => {
    const user = findUserById(discussion.user_id);

    return (
      <Link to={`/discussions/${discussion.id}`} key={discussion.id} >
        <DiscussionListItem
          title={discussion.title}
          count={commentCount(discussion.id)}
          timestamp={discussion.created_at}
          name={user.username}
          avatar={user.avatar}
        />
      </Link> 
    );
  });

  return (
    <div className="discussion-list">
      <div className="buttons">
        <Buttons variant="outlined">Swap</Buttons>
        <Buttons variant="outlined">Meetup</Buttons>
        <Buttons variant="outlined">Other</Buttons>
      </div>
      <SimpleContainer>{discussionPosts}</SimpleContainer>
      {currentUser && <div>
        <Popup 
          title="Create a new discussion"
          openPopup = {openPopup}
          setOpenPopup = {setOpenPopup}
        >
          <DiscussionForm currentUser={currentUser} setOpenPopup={setOpenPopup}/>
        </Popup>
        <Buttons variant="outlined" onClick={() => setOpenPopup(true)}>Add a discussion</Buttons>
      </div>}
    </div>
  );
}

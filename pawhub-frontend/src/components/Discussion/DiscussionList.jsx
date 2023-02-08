import Buttons from "../controls/Buttons";
import DiscussionListItem from "./DiscussionListItem";
import SimpleContainer from "./SimpleContainer";
import axios from "axios";
import { useState, useEffect } from "react";
import DiscussionForm from "./DiscussionForm";
import Popup from "../controls/Popup";

export default function DiscussionList() {
  const [state, setState] = useState({
    discussions: [],
    users: []
  });
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/api/discussions"),
      axios.get("http://localhost:3001/api/users"),
    ])
      // Our res is an array of the response received: [{discussions}, {users}]
      .then((res) => {

        setState((prev) => ({
          ...prev,
          discussions: res[0].data,
          users: res[1].data,
        }));
      })
      .catch((err) => console.log(err));
  }, [openPopup]);

  const findUserById = (userId) =>
    state.users.find((user) => user.id === userId);

  const discussionPosts = state.discussions
    .sort((a,b) => b.id > a.id ? 1 : -1)
    .map((discussion) => {
    const user = findUserById(discussion.user_id);

    return (
      <DiscussionListItem
        key={discussion.id}
        title={discussion.title}
        timestamp={discussion.created_at}
        name={user.username}
        avatar={user.avatar}
      />
    );
  });

  return (
    <div className="discussion-list">
      <div className="buttons">
        <Buttons variant="outlined">Swap</Buttons>
        <Buttons variant="outlined">Meetup</Buttons>
        <Buttons variant="outlined">Other</Buttons>
      </div>
      <Popup 
        title="Create a new discussion"
        openPopup = {openPopup}
        setOpenPopup = {setOpenPopup}
      >
        <DiscussionForm setOpenPopup={setOpenPopup}/>
      </Popup>
      <SimpleContainer>{discussionPosts}</SimpleContainer>
      <Buttons variant="outlined" onClick={() => setOpenPopup(true)}>Add a discussion</Buttons>
    </div>
  );
}
